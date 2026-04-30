// ==========================================
// المحرك الهندسي الشامل (100% مطابق للإكسل)
// يتضمن جميع المعادلات بدقة التامة
// ==========================================

const Calculator = {
    // 1. حساب U-Value
    calculateUValue: function(layers, hi, ho) {
        let rLayers = 0;
        layers.forEach(layer => {
            if(layer.thickness > 0 && layer.k > 0) {
                rLayers += (layer.thickness / layer.k);
            }
        });
        return 1 / ((1 / hi) + (1 / ho) + rLayers);
    },

    // 2. أحمال التوصيل (الجدران، السقف)
    calculateTransmission: function(U, A, CLTD) {
        return U * A * CLTD;
    },

    // 3. الإشعاع الشمسي (للجدران والسقف)
    calculateSolarWall: function(U, A, a, I, ho) {
        let DTs = (1.15 * a * I) / ho;
        return U * A * DTs;
    },

    // 4. الأحمال الداخلية (أشخاص، إضاءة، معدات)
    calculateInternal: function(lightingW, lightingHours, peopleCount, personW, peopleHours, equipW, equipHours) {
        return (lightingW * (lightingHours / 24)) + 
               (personW * peopleCount * (peopleHours / 24)) + 
               (equipW * (equipHours / 24));
    },

    // 5. أحمال المنتج (فوق وتحت التجميد والكامن)
    calculateProduct: function(massKg, cpAbove, cpBelow, latent, tEnter, tFreeze, tStore, coolTime, crf) {
        let qAbove = 0, qLatent = 0, qBelow = 0;
        if (tEnter > tFreeze) {
            let dt = tEnter - Math.max(tFreeze, tStore);
            qAbove = (massKg * cpAbove * dt * 1000) / (3600 * coolTime * crf);
        }
        if (tStore < tFreeze && tEnter >= tFreeze) {
            qLatent = (massKg * latent * 1000) / (3600 * coolTime);
        }
        if (tStore < tFreeze) {
            let tStart = Math.min(tEnter, tFreeze);
            qBelow = (massKg * cpBelow * (tStart - tStore) * 1000) / (3600 * coolTime);
        }
        return qAbove + qLatent + qBelow;
    },

    // 6. حرارة التنفس
    calculateRespiration: function(massKg, respRateWPerTonne, coolTime, crf) {
        return (massKg * respRateWPerTonne) / (3600 * coolTime * crf);
    },

    // 7. حمل مواد التغليف
    calculatePackaging: function(boxesCount, weightPerBox, specificHeat, deltaT, coolTime, crf) {
        let totalMass = boxesCount * weightPerBox;
        return (totalMass * specificHeat * deltaT * 1000) / (3600 * coolTime * crf);
    },

    // 8. حمل تذويب الصقيع (Defrost Load)
    calculateDefrost: function(heatersCount, powerW, usageFactor) {
        return heatersCount * powerW * usageFactor;
    },

    // 9. الطريقة المختصرة (Usage Load)
    calculateUsageMethod: function(volume, cltd, usageFactor) {
        return usageFactor * cltd * volume;
    },

    // 10. حمل التسرب عبر الأبواب
    calculateInfiltration: function(flowRateLs, deltaEnthalpyKjKg) {
        return flowRateLs * deltaEnthalpyKjKg * 1000;
    },

    // 11. حمل التهوية للأشخاص
    calculateVentilation: function(ratePerPerson, peopleCount, deltaEnthalpy, specVolume) {
        return (ratePerPerson * peopleCount * deltaEnthalpy) / specVolume;
    },

    // 12. حمل تغير الهواء بالحجم
    calculateAirChange: function(volume, airChangesPer24h, deltaEnthalpy, specVolume) {
        return (airChangesPer24h * volume * deltaEnthalpy * 1000) / (24 * 3600 * specVolume);
    },

    // 13. السعة الكلية والنهائية للمنظومة
    calculateSystemCapacity: function(totalHeatW, safetyPercent, operationHours) {
        let safeTotal = totalHeatW * (1 + (safetyPercent / 100));
        let requiredW = (safeTotal * 24) / operationHours;
        let kW = requiredW / 1000;
        let tons = kW * 0.2844;
        return { watts: requiredW, tons: tons };
    }
};
