// ثوابت النصاب
const GOLD_NISAB_GRAMS = 85;
const SILVER_NISAB_GRAMS = 595;
const ZAKAT_RATE = 0.025; // 2.5%

// تحويل التاريخ الميلادي إلى هجري
function gregorianToHijri(date) {
  // Simplified conversion - in production, use a proper Hijri calendar library
  const year = date.getFullYear();
  const hijriYear = Math.floor((year - 622) * 1.0307);
  return hijriYear;
}

// حساب الحول الهجري
function calculateHawl(startDate, currentDate = new Date()) {
  const startHijri = gregorianToHijri(startDate);
  const currentHijri = gregorianToHijri(currentDate);
  const daysDiff = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
  
  return {
    hijriYears: currentHijri - startHijri,
    days: daysDiff,
    isComplete: daysDiff >= 354, // سنة هجرية = 354 يوم تقريباً
    remainingDays: Math.max(0, 354 - daysDiff)
  };
}

export function calculateMoneyZakat(amount, currency, goldPricePerGram, madhab, debts = 0, hawlStartDate = null) {
  const netAmount = Math.max(0, amount - debts);
  
  let nisab;
  let nisabType;
  
  if (madhab === 'hanafi') {
    const silverPricePerGram = goldPricePerGram / 70;
    nisab = SILVER_NISAB_GRAMS * silverPricePerGram;
    nisabType = 'الفضة';
  } else {
    nisab = GOLD_NISAB_GRAMS * goldPricePerGram;
    nisabType = 'الذهب';
  }
  
  // التحقق من الحول
  let hawlStatus = { isValid: true, message: 'الحول مكتمل' };
  if (hawlStartDate) {
    const hawl = calculateHawl(new Date(hawlStartDate));
    hawlStatus = {
      isValid: hawl.isComplete,
      message: hawl.isComplete ? 'الحول مكتمل' : `الحول غير مكتمل - متبقي ${hawl.remainingDays} يوم`,
      days: hawl.days,
      remainingDays: hawl.remainingDays
    };
  }
  
  const isDue = netAmount >= nisab && hawlStatus.isValid;
  const zakatAmount = isDue ? netAmount * ZAKAT_RATE : 0;
  
  return {
    isDue,
    amount: zakatAmount,
    nisab,
    rate: ZAKAT_RATE,
    hawlStatus,
    explanation: `نصاب زكاة المال يُحسب على أساس ${nisabType}. المبلغ الصافي بعد خصم الديون: ${netAmount.toLocaleString('ar')} ${currency}. ${isDue ? 'يبلغ النصاب المقرر والحول مكتمل' : 'لا يبلغ النصاب المقرر أو الحول غير مكتمل'}.`,
    madhhabNote: madhab === 'hanafi' 
      ? 'المذهب الحنفي يعتبر نصاب الفضة لكونه أرفق بالفقراء وأكثر إخراجاً للزكاة'
      : `المذهب ${getMadhabName(madhab)} يعتمد نصاب الذهب وهو الأصل في زكاة النقود`,
    islamicNote: 'الأصل في الزكاة أن تُخرج بعد مرور الحول الهجري (354 يوماً) على المال المدخر'
  };
}

export function calculateGoldSilverZakat(weightInGrams, metalType, currentPricePerGram, currency, hawlStartDate = null) {
  const nisabWeight = metalType === 'gold' ? GOLD_NISAB_GRAMS : SILVER_NISAB_GRAMS;
  
  // التحقق من الحول
  let hawlStatus = { isValid: true, message: 'الحول مكتمل' };
  if (hawlStartDate) {
    const hawl = calculateHawl(new Date(hawlStartDate));
    hawlStatus = {
      isValid: hawl.isComplete,
      message: hawl.isComplete ? 'الحول مكتمل' : `الحول غير مكتمل - متبقي ${hawl.remainingDays} يوم`,
      days: hawl.days,
      remainingDays: hawl.remainingDays
    };
  }
  
  const isDue = weightInGrams >= nisabWeight && hawlStatus.isValid;
  const totalValue = weightInGrams * currentPricePerGram;
  const zakatAmount = isDue ? totalValue * ZAKAT_RATE : 0;
  
  return {
    isDue,
    amount: zakatAmount,
    nisab: nisabWeight * currentPricePerGram,
    rate: ZAKAT_RATE,
    hawlStatus,
    explanation: `نصاب ${metalType === 'gold' ? 'الذهب' : 'الفضة'}: ${nisabWeight} جرام. الوزن المملوك: ${weightInGrams} جرام. القيمة الإجمالية: ${totalValue.toLocaleString('ar')} ${currency}. ${isDue ? 'يبلغ النصاب المقرر والحول مكتمل' : 'لا يبلغ النصاب المقرر أو الحول غير مكتمل'}.`,
    madhhabNote: 'جميع المذاهب متفقة على أحكام زكاة الذهب والفضة ومقاديرها',
    islamicNote: 'زكاة الذهب والفضة تُخرج من نفس الجنس أو قيمتها النقدية'
  };
}

export function calculateBusinessZakat(inventoryValue, receivables, payables, currency, goldPricePerGram, madhab, hawlStartDate = null, tradeIntention = true) {
  const netBusinessAssets = Math.max(0, inventoryValue + receivables - payables);
  
  let nisab;
  if (madhab === 'hanafi') {
    const silverPricePerGram = goldPricePerGram / 70;
    nisab = SILVER_NISAB_GRAMS * silverPricePerGram;
  } else {
    nisab = GOLD_NISAB_GRAMS * goldPricePerGram;
  }
  
  // التحقق من الحول ونية التجارة
  let hawlStatus = { isValid: true, message: 'الحول مكتمل' };
  if (hawlStartDate) {
    const hawl = calculateHawl(new Date(hawlStartDate));
    hawlStatus = {
      isValid: hawl.isComplete,
      message: hawl.isComplete ? 'الحول مكتمل' : `الحول غير مكتمل - متبقي ${hawl.remainingDays} يوم`,
      days: hawl.days,
      remainingDays: hawl.remainingDays
    };
  }
  
  const isDue = netBusinessAssets >= nisab && hawlStatus.isValid && tradeIntention;
  const zakatAmount = isDue ? netBusinessAssets * ZAKAT_RATE : 0;
  
  return {
    isDue,
    amount: zakatAmount,
    nisab,
    rate: ZAKAT_RATE,
    hawlStatus,
    tradeIntention,
    explanation: `صافي أصول التجارة (البضائع + المديونات - الديون): ${netBusinessAssets.toLocaleString('ar')} ${currency}. ${isDue ? 'يبلغ النصاب المقرر والحول مكتمل ونية التجارة موجودة' : 'لا يبلغ النصاب المقرر أو الحول غير مكتمل أو نية التجارة غير موجودة'}.`,
    madhhabNote: 'تُقوَّم عروض التجارة بسعر البيع في نهاية الحول الهجري',
    islamicNote: 'شرط زكاة عروض التجارة: نية التجارة عند الشراء وحولان الحول'
  };
}

export function calculateAgricultureZakat(harvestQuantity, irrigationType, madhab, harvestDate = new Date()) {
  const nisab = 653; // كيلوجرام (5 أوسق)
  const isDue = harvestQuantity >= nisab;
  
  const rate = irrigationType === 'natural' ? 0.1 : 0.05;
  const zakatQuantity = isDue ? harvestQuantity * rate : 0;
  
  // زكاة الزراعة تُحسب عند الحصاد وليس عند البيع
  const harvestHijri = gregorianToHijri(harvestDate);
  
  return {
    isDue,
    amount: zakatQuantity,
    nisab,
    rate,
    harvestDate: harvestHijri,
    explanation: `نصاب زكاة الزروع: ${nisab} كيلوجرام. المحصول: ${harvestQuantity} كيلوجرام. نوع السقي: ${irrigationType === 'natural' ? 'طبيعي (مطر/نهر)' : 'صناعي (ري/آلة)'}. ${isDue ? 'يبلغ النصاب المقرر' : 'لا يبلغ النصاب المقرر'}.`,
    madhhabNote: irrigationType === 'natural' 
      ? 'الزرع الذي يُسقى بماء المطر أو الأنهار: العُشر (10%)'
      : 'الزرع الذي يُسقى بالآلات والتكلفة: نصف العُشر (5%)',
    islamicNote: 'زكاة الزراعة تُحسب عند الحصاد وليس عند البيع، وتُخرج من نفس المحصول'
  };
}

export function calculateLivestockZakat(count, animalType, madhab, hawlStartDate = null, isSaima = true) {
  let nisab;
  let zakatDue = 0;
  let explanation;
  
  switch (animalType) {
    case 'camels':
      nisab = 5;
      if (count >= 5 && count <= 9) zakatDue = 1;
      else if (count >= 10 && count <= 14) zakatDue = 2;
      else if (count >= 15 && count <= 19) zakatDue = 3;
      else if (count >= 20 && count <= 24) zakatDue = 4;
      else if (count >= 25) zakatDue = Math.floor(count / 25) + (count % 25 >= 5 ? 1 : 0);
      explanation = `نصاب الإبل: ${nisab} رؤوس. العدد المملوك: ${count}`;
      break;
      
    case 'cattle':
      nisab = 30;
      if (count >= 30 && count <= 39) zakatDue = 1;
      else if (count >= 40) zakatDue = Math.floor(count / 30) + Math.floor((count % 30) / 40);
      explanation = `نصاب البقر: ${nisab} رأساً. العدد المملوك: ${count}`;
      break;
      
    case 'sheep':
      nisab = 40;
      if (count >= 40 && count <= 120) zakatDue = 1;
      else if (count >= 121 && count <= 200) zakatDue = 2;
      else if (count >= 201) zakatDue = Math.floor(count / 100);
      explanation = `نصاب الغنم: ${nisab} رأساً. العدد المملوك: ${count}`;
      break;
  }
  
  // التحقق من الحول والسوم
  let hawlStatus = { isValid: true, message: 'الحول مكتمل' };
  if (hawlStartDate) {
    const hawl = calculateHawl(new Date(hawlStartDate));
    hawlStatus = {
      isValid: hawl.isComplete,
      message: hawl.isComplete ? 'الحول مكتمل' : `الحول غير مكتمل - متبقي ${hawl.remainingDays} يوم`,
      days: hawl.days,
      remainingDays: hawl.remainingDays
    };
  }
  
  const isDue = count >= nisab && hawlStatus.isValid && isSaima;
  
  return {
    isDue,
    amount: zakatDue,
    nisab,
    rate: 0,
    hawlStatus,
    isSaima,
    explanation: explanation + `. ${isDue ? 'يبلغ النصاب المقرر والحول مكتمل والحيوانات سائمة' : 'لا يبلغ النصاب المقرر أو الحول غير مكتمل أو الحيوانات غير سائمة'}.`,
    madhhabNote: 'زكاة الأنعام تُخرج من جنسها، والمقادير ثابتة بالنص الشرعي',
    islamicNote: 'شرط زكاة الأنعام: أن تكون سائمة (ترعى من الكلأ الطبيعي) وليست للعمل أو التجارة'
  };
}

export function calculateIncomeZakat(monthlyIncome, monthlyExpenses, additionalIncome, calculationMethod, madhab, goldPricePerGram, currency, hawlStartDate = null) {
  const totalMonthlyIncome = monthlyIncome + additionalIncome;
  const netMonthlyIncome = Math.max(0, totalMonthlyIncome - monthlyExpenses);
  
  let nisab;
  if (madhab === 'hanafi') {
    const silverPricePerGram = goldPricePerGram / 70;
    nisab = SILVER_NISAB_GRAMS * silverPricePerGram;
  } else {
    nisab = GOLD_NISAB_GRAMS * goldPricePerGram;
  }
  
  let isDue;
  let zakatAmount;
  let explanation;
  let islamicNote;
  
  if (calculationMethod === 'monthly') {
    // رأي معاصر - يحتاج إلى تنبيه
    isDue = netMonthlyIncome > 0;
    zakatAmount = isDue ? netMonthlyIncome * ZAKAT_RATE : 0;
    explanation = `الدخل الشهري الصافي: ${netMonthlyIncome.toLocaleString('ar')} ${currency}. يُخرج منه 2.5% شهرياً (رأي معاصر).`;
    islamicNote = '⚠️ هذا رأي معاصر لبعض العلماء المعاصرين. الأصل في الزكاة أن تُخرج بعد مرور الحول الهجري على المال المدخر. استشر أهل العلم في بلدك.';
  } else {
    // الرأي التقليدي - الأصح
    const annualSavings = netMonthlyIncome * 12;
    isDue = annualSavings >= nisab;
    zakatAmount = isDue ? annualSavings * ZAKAT_RATE : 0;
    explanation = `المدخرات السنوية المتوقعة: ${annualSavings.toLocaleString('ar')} ${currency}. ${isDue ? 'تبلغ النصاب المقرر' : 'لا تبلغ النصاب المقرر'}.`;
    islamicNote = 'الأصل في الزكاة أن تُخرج بعد مرور الحول الهجري (354 يوماً) على المال المدخر من الدخل.';
  }
  
  // التحقق من الحول للطريقة التقليدية
  let hawlStatus = { isValid: true, message: 'الحول مكتمل' };
  if (calculationMethod === 'traditional' && hawlStartDate) {
    const hawl = calculateHawl(new Date(hawlStartDate));
    hawlStatus = {
      isValid: hawl.isComplete,
      message: hawl.isComplete ? 'الحول مكتمل' : `الحول غير مكتمل - متبقي ${hawl.remainingDays} يوم`,
      days: hawl.days,
      remainingDays: hawl.remainingDays
    };
    isDue = isDue && hawlStatus.isValid;
  }
  
  return {
    isDue,
    amount: zakatAmount,
    nisab,
    rate: ZAKAT_RATE,
    hawlStatus,
    explanation,
    madhhabNote: calculationMethod === 'monthly' 
      ? 'بعض العلماء المعاصرين يجيز إخراج زكاة الدخل شهرياً تيسيراً على المكلف (رأي معاصر)'
      : 'الأصل في الزكاة أن تُخرج بعد مرور الحول الهجري على المال المدخر (الرأي التقليدي)',
    islamicNote
  };
}

export function calculateRentalZakat(monthlyRent, propertyExpenses, maintenanceCosts, propertyTax, calculationPeriod, madhab, goldPricePerGram, currency, hawlStartDate = null) {
  const netMonthlyRent = Math.max(0, monthlyRent - propertyExpenses - maintenanceCosts - propertyTax);
  
  let nisab;
  if (madhab === 'hanafi') {
    const silverPricePerGram = goldPricePerGram / 70;
    nisab = SILVER_NISAB_GRAMS * silverPricePerGram;
  } else {
    nisab = GOLD_NISAB_GRAMS * goldPricePerGram;
  }
  
  let isDue;
  let zakatAmount;
  let explanation;
  let islamicNote;
  
  if (calculationPeriod === 'monthly') {
    // رأي معاصر - يحتاج إلى تنبيه
    isDue = netMonthlyRent > 0;
    zakatAmount = isDue ? netMonthlyRent * ZAKAT_RATE : 0;
    explanation = `صافي الإيجار الشهري: ${netMonthlyRent.toLocaleString('ar')} ${currency}. يُخرج منه 2.5% شهرياً (رأي معاصر).`;
    islamicNote = '⚠️ هذا رأي معاصر لبعض العلماء المعاصرين. الأصل في الزكاة أن تُخرج بعد مرور الحول الهجري على الإيرادات المجمعة.';
  } else {
    // الرأي التقليدي - الأصح
    const annualRent = netMonthlyRent * 12;
    isDue = annualRent >= nisab;
    zakatAmount = isDue ? annualRent * ZAKAT_RATE : 0;
    explanation = `صافي الإيجار السنوي: ${annualRent.toLocaleString('ar')} ${currency}. ${isDue ? 'يبلغ النصاب المقرر' : 'لا يبلغ النصاب المقرر'}.`;
    islamicNote = 'الأصل في زكاة إيرادات العقارات أن تُجمع لمدة سنة هجرية كاملة ثم تُخرج زكاتها.';
  }
  
  // التحقق من الحول للطريقة التقليدية
  let hawlStatus = { isValid: true, message: 'الحول مكتمل' };
  if (calculationPeriod === 'traditional' && hawlStartDate) {
    const hawl = calculateHawl(new Date(hawlStartDate));
    hawlStatus = {
      isValid: hawl.isComplete,
      message: hawl.isComplete ? 'الحول مكتمل' : `الحول غير مكتمل - متبقي ${hawl.remainingDays} يوم`,
      days: hawl.days,
      remainingDays: hawl.remainingDays
    };
    isDue = isDue && hawlStatus.isValid;
  }
  
  return {
    isDue,
    amount: zakatAmount,
    nisab,
    rate: ZAKAT_RATE,
    hawlStatus,
    explanation,
    madhhabNote: 'الأصل في زكاة إيرادات العقارات أن تُجمع لمدة سنة ثم تُخرج زكاتها',
    islamicNote
  };
}

export function calculateInvestmentZakat(totalValue, dividends, capitalGains, investmentFees, investmentType, holdingPeriod, madhab, goldPricePerGram, currency, hawlStartDate = null, tradeIntention = false) {
  let nisab;
  if (madhab === 'hanafi') {
    const silverPricePerGram = goldPricePerGram / 70;
    nisab = SILVER_NISAB_GRAMS * silverPricePerGram;
  } else {
    nisab = GOLD_NISAB_GRAMS * goldPricePerGram;
  }
  
  let zakatableAmount;
  let explanation;
  let islamicNote;
  
  if (holdingPeriod === 'short' && tradeIntention) {
    // استثمار قصير المدى بنية التجارة
    zakatableAmount = Math.max(0, totalValue - investmentFees);
    explanation = `استثمار قصير المدى بنية التجارة: القيمة الكاملة ${totalValue.toLocaleString('ar')} ${currency} خاضعة للزكاة.`;
    islamicNote = 'الاستثمار بغرض التجارة قصيرة المدى: زكاة على القيمة السوقية الكاملة بعد خصم المصروفات.';
  } else if (holdingPeriod === 'long' && investmentType === 'islamic') {
    // استثمار إسلامي طويل المدى
    zakatableAmount = Math.max(0, dividends + capitalGains - investmentFees);
    explanation = `استثمار إسلامي طويل المدى: الأرباح المحققة ${zakatableAmount.toLocaleString('ar')} ${currency} خاضعة للزكاة.`;
    islamicNote = 'الاستثمار الإسلامي طويل المدى: زكاة على الأرباح الموزعة والمحققة فقط، وليس على رأس المال.';
  } else {
    // استثمار عادي طويل المدى
    zakatableAmount = Math.max(0, dividends - investmentFees);
    explanation = `استثمار طويل المدى: الأرباح الموزعة ${zakatableAmount.toLocaleString('ar')} ${currency} خاضعة للزكاة.`;
    islamicNote = 'الاستثمار طويل المدى: زكاة على الأرباح الموزعة فقط. رأس المال لا يخضع للزكاة إلا إذا كان بنية التجارة.';
  }
  
  // التحقق من الحول
  let hawlStatus = { isValid: true, message: 'الحول مكتمل' };
  if (hawlStartDate) {
    const hawl = calculateHawl(new Date(hawlStartDate));
    hawlStatus = {
      isValid: hawl.isComplete,
      message: hawl.isComplete ? 'الحول مكتمل' : `الحول غير مكتمل - متبقي ${hawl.remainingDays} يوم`,
      days: hawl.days,
      remainingDays: hawl.remainingDays
    };
  }
  
  const isDue = zakatableAmount >= nisab && hawlStatus.isValid;
  const zakatAmount = isDue ? zakatableAmount * ZAKAT_RATE : 0;
  
  return {
    isDue,
    amount: zakatAmount,
    nisab,
    rate: ZAKAT_RATE,
    hawlStatus,
    tradeIntention,
    explanation: explanation + ` ${isDue ? 'يبلغ النصاب المقرر والحول مكتمل' : 'لا يبلغ النصاب المقرر أو الحول غير مكتمل'}.`,
    madhhabNote: holdingPeriod === 'short' && tradeIntention
      ? 'الاستثمار بغرض التجارة: زكاة على القيمة السوقية الكاملة'
      : 'الاستثمار طويل المدى: زكاة على الأرباح الموزعة والمحققة فقط',
    islamicNote: islamicNote + ' استشر أهل العلم في بلدك للفتوى المناسبة لحالتك.'
  };
}

function getMadhabName(madhab) {
  switch (madhab) {
    case 'maliki': return 'المالكي';
    case 'shafii': return 'الشافعي';
    case 'hanbali': return 'الحنبلي';
    default: return 'الحنفي';
  }
}
