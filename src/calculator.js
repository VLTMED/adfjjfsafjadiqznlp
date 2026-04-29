// ==========================================
// ملف المعادلات والحسابات الهندسية (The Core Logic)
// مطابق تماماً لمعادلات ملف الإكسل (د. رحيم)
// ==========================================

const Calculator = {
    
    // 1. حساب معامل انتقال الحرارة (U-Value) للجدران أو السقف أو الأرضية
    // المعادلة: U = 1 / ( (1/hi) + (1/ho) + Sum(thickness / k) )
    calculateUValue: function(layers, hi, ho) {
        let rLayers = 0;
        layers.forEach(layer => {
            if(layer.thickness > 0 && layer.k > 0) {
                rLayers += (layer.thickness / layer.k);
            }
        });
        
        let rTotal = (1 / hi) + (1 / ho) + rLayers;
        return 1 / rTotal; // W/m2.K
    },

    // 2. حساب حمل انتقال الحرارة بالتوصيل (الجدران، السقف)
    // المعادلة: Q = U * A * CLTD
    calculateTransmissionLoad: function(U, A, CLTD) {
        return U * A * CLTD; // Watts
    },

    // 3. حساب تأثير الإشعاع الشمسي على الجدران والسقف
    // المعادلة: DTs = 1.15 * a * I / ho
    // المعادلة: Q = U * A * DTs
    calculateSolarLoad: function(U, A, a, I, ho) {
        let DTs = (1.15 * a * I) / ho;
        return U * A * DTs; // Watts
    },

    // 4. حساب حمل النوافذ الزجاجية (التوصيل + الإشعاع)
    // التوصيل: Q = A * U * CLTD
    // الإشعاع: Q = A * Qsun * SC
    calculateGlassLoad: function(A, U, CLTD, Qsun, SC) {
        let transmission = A * U * CLTD;
        let solar = A * Qsun * SC;
        return transmission + solar; // Watts
    },

    // 5. حساب الأحمال الداخلية (إضاءة، أشخاص، معدات)
    calculateInternalLoads: function(lightingW, lightingHours, peopleCount, personHeatW, peopleHours, equipW, equipHours) {
        let qLight = lightingW * (lightingHours / 24);
        let qPeople = personHeatW * peopleCount * (peopleHours / 24);
        let qEquip = equipW * (equipHours / 24);
        
        return {
            lighting: qLight,
            people: qPeople,
            equipment: qEquip,
            total: qLight + qPeople + qEquip // Watts
        };
    },

    // 6. حساب أحمال المنتجات (فوق التجميد، التجميد، تحت التجميد)
    calculateProductLoad: function(mass, cpAbove, cpBelow, latent, tEnter, tFreeze, tStore, coolTimeHours, CRF) {
        let qAbove = 0;
        let qLatent = 0;
        let qBelow = 0;

        // حمل التبريد فوق الانجماد
        if (tEnter > tFreeze) {
            let deltaT = tEnter - Math.max(tFreeze, tStore);
            qAbove = (mass * cpAbove * deltaT * 1000) / (3600 * coolTimeHours * CRF);
        }

        // حمل التجميد (الكامن)
        if (tStore < tFreeze && tEnter >= tFreeze) {
            qLatent = (mass * latent * 1000) / (3600 * coolTimeHours);
        }

        // حمل التبريد تحت الانجماد
        if (tStore < tFreeze) {
            let tStartBelow = Math.min(tEnter, tFreeze);
            let deltaT = tStartBelow - tStore;
            qBelow = (mass * cpBelow * deltaT * 1000) / (3600 * coolTimeHours);
        }

        return {
            aboveFreezing: qAbove,
            latent: qLatent,
            belowFreezing: qBelow,
            total: qAbove + qLatent + qBelow // Watts
        };
    },

    // 7. حساب حرارة التنفس للمنتجات (الخضار والفواكه)
    // المعادلة: Q = Mass(Tons) * RespirationRate / (3600 * Time * CRF)
    calculateRespirationLoad: function(massKg, respRateWPerTon, coolTimeHours, CRF) {
        let massTon = massKg / 1000;
        // ملاحظة: في الإكسل تم جمعها مباشرة مع حمل فوق التجميد
        return (massKg * respRateWPerTon) / (3600 * coolTimeHours * CRF); 
    },

    // 8. حساب حمل تسرب الهواء (Infiltration) عبر الأبواب
    // المعادلة: Q = L/s * kJ/L * 1000 = Watts
    calculateInfiltrationLoad: function(flowRateLs, deltaEnthalpyKJL) {
        return flowRateLs * deltaEnthalpyKJL * 1000; // Watts
    },

    // 9. حساب حمل التهوية (Ventilation)
    // المعادلة: Q = (L/s/Person * People * DeltaH_kJ_kg) / SpecificVolume
    // ملاحظة الوحدات تلغي بعضها لتنتج Watts مباشرة كما في الإكسل
    calculateVentilationLoad: function(ratePerPerson, peopleCount, hi, ho, specificVolume) {
        let deltaH = ho - hi; // kJ/kg
        return (ratePerPerson * peopleCount * deltaH) / specificVolume; // Watts
    },

    // 10. حساب السعة الكلية المطلوبة للمنظومة
    calculateSystemCapacity: function(totalHeatGain, safetyFactorPercent, operationHoursPerDay) {
        // إضافة معامل الأمان (مثلاً 10%)
        let totalWithSafety = totalHeatGain * (1 + (safetyFactorPercent / 100));
        
        // تعديل السعة بناءً على ساعات تشغيل الضاغط (مثلاً 16 ساعة بدل 24)
        let requiredCapacityW = (totalWithSafety * 24) / operationHoursPerDay;
        
        // التحويل إلى كيلو وات وطن تبريد
        let capacityKW = requiredCapacityW / 1000;
        let capacityTon = capacityKW * 0.2844; // معامل التحويل في ملف الإكسل
        
        return {
            watts: requiredCapacityW,
            kW: capacityKW,
            tons: capacityTon
        };
    }
};