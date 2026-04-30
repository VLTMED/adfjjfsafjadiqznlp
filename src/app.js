// ==========================================
// ملف الربط الديناميكي (Controller) المتقدم
// يربط واجهة HTML ببيانات data.js ومحرك calculator.js
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. تعبئة القوائم المنسدلة (Dropdowns) تلقائياً من قاعدة البيانات ---
    
    const populateSelect = (selectId, dataObj) => {
        const select = document.getElementById(selectId);
        for (const key in dataObj) {
            let option = document.createElement('option');
            option.value = key;
            option.textContent = dataObj[key].name;
            select.appendChild(option);
        }
    };

    // تعبئة مواد البناء (الجدران)
    populateSelect('layer1-select', ASHRAE_DATA.materials);
    populateSelect('layer2-select', ASHRAE_DATA.materials);
    populateSelect('layer3-select', ASHRAE_DATA.materials);
    
    // ضبط الخيارات الافتراضية للجدران لتشابه الإكسل
    document.getElementById('layer1-select').value = "concrete";
    document.getElementById('layer2-select').value = "poly_smooth";
    document.getElementById('layer3-select').value = "cement_brick";

    // تعبئة المنتجات (أكثر من 100 منتج!)
    populateSelect('product-select', ASHRAE_DATA.products);

    // تعبئة حالة الأشخاص
    populateSelect('people-state', ASHRAE_DATA.people_heat);


    // --- 2. تنفيذ الحسابات عند الضغط على الزر ---
    
    document.getElementById('calculate-btn').addEventListener('click', () => {
        
        // جلب الأبعاد والحرارة
        const L = parseFloat(document.getElementById('room-length').value) || 0;
        const W = parseFloat(document.getElementById('room-width').value) || 0;
        const H = parseFloat(document.getElementById('room-height').value) || 0;
        const tIn = parseFloat(document.getElementById('temp-in').value) || 0;
        const tOut = parseFloat(document.getElementById('temp-out').value) || 0;
        const cltd = tOut - tIn; 

        // حساب U-Value الديناميكي
        const l1Key = document.getElementById('layer1-select').value;
        const l2Key = document.getElementById('layer2-select').value;
        const l3Key = document.getElementById('layer3-select').value;

        const layers =[
            { thickness: parseFloat(document.getElementById('layer1-thk').value), k: ASHRAE_DATA.materials[l1Key].k },
            { thickness: parseFloat(document.getElementById('layer2-thk').value), k: ASHRAE_DATA.materials[l2Key].k },
            { thickness: parseFloat(document.getElementById('layer3-thk').value), k: ASHRAE_DATA.materials[l3Key].k }
        ];

        const ho = 22.7; // هواء خارجي
        const hi = 9.37; // هواء داخلي
        const uValue = Calculator.calculateUValue(layers, hi, ho);

        // أحمال الجدران والسقف
        const areaRoof = L * W; 
        const areaWalls = (2 * L * H) + (2 * W * H); 
        const transmissionLoad = Calculator.calculateTransmission(uValue, areaRoof + areaWalls, cltd);

        // حساب حمل المنتج المختار
        const selectedProdKey = document.getElementById('product-select').value;
        const prodData = ASHRAE_DATA.products[selectedProdKey];
        const mass = parseFloat(document.getElementById('product-mass').value) || 0;
        const tEnter = parseFloat(document.getElementById('product-enter-temp').value) || 0;
        const coolTime = parseFloat(document.getElementById('cool-time').value) || 24;

        const productLoad = Calculator.calculateProduct(
            mass, prodData.cp_a, prodData.cp_b, prodData.lat, 
            tEnter, prodData.tf, tIn, coolTime, prodData.crf
        );

        // الأحمال الداخلية
        const peopleStateKey = document.getElementById('people-state').value;
        const personW = ASHRAE_DATA.people_heat[peopleStateKey].qt;
        const peopleCount = parseFloat(document.getElementById('people-count').value) || 0;
        const lightsCount = parseFloat(document.getElementById('lights-count').value) || 0;
        const equipPower = parseFloat(document.getElementById('equip-power').value) || 0;

        const internalLoad = Calculator.calculateInternal(lightsCount * 100, 8, peopleCount, personW, 8, equipPower, 8);

        // التهوية (افتراضية للتجربة)
        const ventilationLoad = Calculator.calculateVentilation(ASHRAE_DATA.ventilation.office_pub.rate, peopleCount, 45, 91, 0.91);

        // تجميع الأحمال وحساب سعة النظام
        const totalHeatGain = transmissionLoad + productLoad + internalLoad + ventilationLoad;
        const capacity = Calculator.calculateSystemCapacity(totalHeatGain, 10, 24); // معامل أمان 10%

        // تحديث الواجهة (الشاشة اليسرى)
        document.getElementById('res-walls').innerText = transmissionLoad.toFixed(2) + " W";
        document.getElementById('res-solar').innerText = "0.00 W"; // يمكن تطويرها لاحقاً
        document.getElementById('res-products').innerText = productLoad.toFixed(2) + " W";
        document.getElementById('res-internal').innerText = internalLoad.toFixed(2) + " W";
        document.getElementById('res-air').innerText = ventilationLoad.toFixed(2) + " W";

        document.getElementById('res-total-w').innerText = totalHeatGain.toFixed(2) + " W";
        document.getElementById('res-total-ton').innerText = capacity.tons.toFixed(2) + " TR";
        
        console.log("Calculations completed successfully!");
    });
});
