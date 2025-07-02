export const faqData = {
  general: {
    title: "General Zakat Questions",
    questions: [
      {
        id: "what-is-zakat",
        q: "What is Zakat and why is it important?",
        a: "Zakat is the third pillar of Islam and an obligatory charitable payment for Muslims who meet certain wealth criteria. It serves to purify wealth, help the needy, and strengthen community bonds. The Quran mentions Zakat over 30 times, often paired with prayer, emphasizing its importance in Islamic practice.",
        references: [
          { name: "Quran 2:267-273", url: "https://quran.com/2/267-273" },
          { name: "Sahih Bukhari - Book of Zakat", url: "https://sunnah.com/bukhari/24" }
        ],
        tags: ["basics", "obligation", "importance"]
      },
      {
        id: "nisab-threshold",
        q: "What is the Nisab threshold and how is it calculated?",
        a: "Nisab is the minimum amount of wealth that makes Zakat obligatory. The current Nisab is equivalent to 87.48 grams of gold or 612.36 grams of silver. This threshold ensures that only those with sufficient wealth pay Zakat, while protecting those with minimal assets.",
        references: [
          { name: "Islamic Fiqh Academy - Nisab Calculation", url: "https://www.fiqhacademy.org" },
          { name: "Contemporary Islamic Finance", url: "https://www.islamicfinance.com" }
        ],
        tags: ["nisab", "threshold", "calculation"]
      },
      {
        id: "when-to-pay",
        q: "When should I pay Zakat?",
        a: "Zakat should be paid annually when your wealth has been in your possession for one complete lunar year (Hijri year). You can choose any date during the year as your Zakat due date, but it's recommended to pay it during Ramadan for greater spiritual benefit.",
        references: [
          { name: "Sahih Muslim - Timing of Zakat", url: "https://sunnah.com/muslim/12" },
          { name: "Islamic Scholars Consensus", url: "https://www.islamic-scholars.com" }
        ],
        tags: ["timing", "lunar-year", "ramadan"]
      },
      {
        id: "who-receives",
        q: "Who is eligible to receive Zakat?",
        a: "Zakat can be given to eight categories of people: the poor (fuqara), the needy (masakeen), those working to collect Zakat, those whose hearts are to be reconciled, freeing slaves, those in debt, in the cause of Allah, and travelers in need. The Quran clearly defines these categories in Surah At-Tawbah.",
        references: [
          { name: "Quran 9:60", url: "https://quran.com/9/60" },
          { name: "Islamic Relief - Zakat Recipients", url: "https://www.islamic-relief.org" }
        ],
        tags: ["recipients", "categories", "eligibility"]
      },
      {
        id: "zakat-rate",
        q: "What is the Zakat rate and how is it calculated?",
        a: "The standard Zakat rate is 2.5% (1/40th) of your total wealth. However, different rates apply to specific assets: agricultural produce (5-10% depending on irrigation), livestock (varies by type and number), and minerals (20%). The calculation is: Zakat Amount = Total Wealth × 2.5%.",
        references: [
          { name: "Islamic Fiqh Academy - Zakat Rates", url: "https://www.fiqhacademy.org" },
          { name: "Contemporary Islamic Finance", url: "https://www.islamicfinance.com" }
        ],
        tags: ["rate", "calculation", "percentage"]
      }
    ]
  },
  money: {
    title: "Money & Cash Zakat",
    questions: [
      {
        id: "cash-zakat",
        q: "Do I pay Zakat on cash in my bank account?",
        a: "Yes, you must pay Zakat on all cash in your bank accounts, including savings, checking, and fixed deposits. This includes both personal and business accounts if the total exceeds the Nisab threshold and has been in your possession for one lunar year.",
        references: [
          { name: "Islamic Fiqh Academy - Bank Deposits", url: "https://www.fiqhacademy.org" },
          { name: "Contemporary Islamic Finance", url: "https://www.islamicfinance.com" }
        ],
        tags: ["cash", "bank", "deposits"]
      },
      {
        id: "foreign-currency",
        q: "How do I calculate Zakat on foreign currency?",
        a: "Convert all foreign currencies to your local currency using current exchange rates on your Zakat due date. Add the converted amounts to your total wealth and calculate 2.5% on the total. It's recommended to use reliable exchange rates from official sources.",
        references: [
          { name: "Islamic Scholars Consensus", url: "https://www.islamic-scholars.com" },
          { name: "Contemporary Islamic Finance", url: "https://www.islamicfinance.com" }
        ],
        tags: ["foreign-currency", "exchange-rate", "conversion"]
      },
      {
        id: "loans-receivable",
        q: "Do I pay Zakat on money I've lent to others?",
        a: "You pay Zakat on loans that you expect to recover. If the loan is likely to be repaid, include it in your Zakat calculation. However, if the loan is doubtful or unlikely to be recovered, you don't pay Zakat on it until you actually receive the money.",
        references: [
          { name: "Islamic Fiqh Academy - Loans", url: "https://www.fiqhacademy.org" },
          { name: "Contemporary Islamic Finance", url: "https://www.islamicfinance.com" }
        ],
        tags: ["loans", "receivables", "doubtful-debts"]
      },
      {
        id: "debt-deduction",
        q: "Can I deduct my debts from my Zakat calculation?",
        a: "Yes, you can deduct immediate debts that are due within the year from your total wealth before calculating Zakat. This includes credit card balances, personal loans, and other short-term obligations. Long-term debts like mortgages are typically not deducted.",
        references: [
          { name: "Islamic Scholars Consensus", url: "https://www.islamic-scholars.com" },
          { name: "Contemporary Islamic Finance", url: "https://www.islamicfinance.com" }
        ],
        tags: ["debts", "deduction", "calculation"]
      }
    ]
  },
  gold: {
    title: "Gold & Silver Zakat",
    questions: [
      {
        id: "gold-jewelry",
        q: "Do I pay Zakat on gold jewelry I wear daily?",
        a: "Yes, you must pay Zakat on all gold jewelry if the total value exceeds the Nisab threshold and you've owned it for one lunar year. This includes rings, necklaces, bracelets, earrings, and any other gold items, regardless of whether you wear them or not.",
        references: [
          { name: "Sahih Bukhari - Gold Jewelry", url: "https://sunnah.com/bukhari/24" },
          { name: "Islamic Fiqh Academy - Jewelry", url: "https://www.fiqhacademy.org" }
        ],
        tags: ["gold", "jewelry", "daily-use"]
      },
      {
        id: "gold-plated",
        q: "Is there Zakat on gold-plated items?",
        a: "No, Zakat only applies to items made of pure gold or gold alloys with significant gold content. Gold-plated items, where gold is only a thin coating, are not subject to Zakat. The same applies to silver-plated items.",
        references: [
          { name: "Islamic Scholars Consensus", url: "https://www.islamic-scholars.com" },
          { name: "Contemporary Islamic Finance", url: "https://www.islamicfinance.com" }
        ],
        tags: ["gold-plated", "alloys", "coating"]
      },
      {
        id: "gold-investment",
        q: "How do I calculate Zakat on gold investments?",
        a: "Calculate Zakat on gold investments (ETFs, mining stocks, etc.) at 2.5% of their current market value. Use the market price on your Zakat due date. If you've held the investment for less than a year, you don't pay Zakat until the full year has passed.",
        references: [
          { name: "Islamic Fiqh Academy - Gold Investment", url: "https://www.fiqhacademy.org" },
          { name: "Contemporary Islamic Finance", url: "https://www.islamicfinance.com" }
        ],
        tags: ["investment", "etf", "stocks"]
      },
      {
        id: "silver-zakat",
        q: "What is the Nisab for silver and how is it calculated?",
        a: "The Nisab for silver is 612.36 grams (approximately 21.6 ounces). If you own silver worth more than this amount and have held it for one lunar year, you must pay 2.5% Zakat on the total value. Silver includes jewelry, coins, and other silver items.",
        references: [
          { name: "Islamic Fiqh Academy - Silver Nisab", url: "https://www.fiqhacademy.org" },
          { name: "Contemporary Islamic Finance", url: "https://www.islamicfinance.com" }
        ],
        tags: ["silver", "nisab", "calculation"]
      }
    ]
  },
  business: {
    title: "Business & Trade Zakat",
    questions: [
      {
        id: "business-inventory",
        q: "How do I calculate Zakat on business inventory?",
        a: "Calculate Zakat on business inventory at 2.5% of the total value of goods for sale. Include the cost price of all inventory items, raw materials, and finished products. Don't include fixed assets like equipment, buildings, or vehicles used in the business.",
        references: [
          { name: "Islamic Fiqh Academy - Business Inventory", url: "https://www.fiqhacademy.org" },
          { name: "Contemporary Islamic Finance", url: "https://www.islamicfinance.com" }
        ],
        tags: ["business", "inventory", "trade"]
      },
      {
        id: "business-cash",
        q: "Do I pay Zakat on business bank accounts?",
        a: "Yes, you must pay Zakat on cash in business bank accounts if the total exceeds the Nisab threshold. This includes operating accounts, savings accounts, and any other business-related cash holdings. Calculate 2.5% on the total business cash.",
        references: [
          { name: "Islamic Scholars Consensus", url: "https://www.islamic-scholars.com" },
          { name: "Contemporary Islamic Finance", url: "https://www.islamicfinance.com" }
        ],
        tags: ["business-cash", "bank-accounts", "operating"]
      },
      {
        id: "accounts-receivable",
        q: "How do I handle accounts receivable for Zakat?",
        a: "Include accounts receivable that you expect to collect within the year in your Zakat calculation. If some receivables are doubtful or overdue, you may exclude them until actually received. Use your best judgment based on payment history and customer reliability.",
        references: [
          { name: "Islamic Fiqh Academy - Receivables", url: "https://www.fiqhacademy.org" },
          { name: "Contemporary Islamic Finance", url: "https://www.islamicfinance.com" }
        ],
        tags: ["receivables", "doubtful", "collection"]
      },
      {
        id: "business-expenses",
        q: "Can I deduct business expenses from Zakat calculation?",
        a: "You can deduct immediate business expenses and liabilities from your business assets before calculating Zakat. This includes rent, utilities, salaries, and other operational costs. However, don't deduct long-term investments or fixed assets.",
        references: [
          { name: "Islamic Scholars Consensus", url: "https://www.islamic-scholars.com" },
          { name: "Contemporary Islamic Finance", url: "https://www.islamicfinance.com" }
        ],
        tags: ["expenses", "deduction", "liabilities"]
      }
    ]
  },
  agriculture: {
    title: "Agricultural Zakat",
    questions: [
      {
        id: "agricultural-rate",
        q: "What is the Zakat rate for agricultural produce?",
        a: "The Zakat rate for agricultural produce is 5% if the land is irrigated by natural means (rain, rivers, etc.) and 10% if irrigated artificially (pumps, wells, etc.). This applies to crops like wheat, rice, fruits, and vegetables that are harvested annually.",
        references: [
          { name: "Quran 6:141", url: "https://quran.com/6/141" },
          { name: "Sahih Bukhari - Agricultural Zakat", url: "https://sunnah.com/bukhari/24" }
        ],
        tags: ["agriculture", "rate", "irrigation"]
      },
      {
        id: "when-agricultural",
        q: "When do I pay Zakat on agricultural produce?",
        a: "Zakat on agricultural produce is due at harvest time, not annually. You pay Zakat on each harvest when the crops are ready for harvest. If you harvest multiple times a year, you pay Zakat on each harvest separately.",
        references: [
          { name: "Islamic Fiqh Academy - Agricultural Timing", url: "https://www.fiqhacademy.org" },
          { name: "Contemporary Islamic Finance", url: "https://www.islamicfinance.com" }
        ],
        tags: ["harvest", "timing", "multiple-crops"]
      },
      {
        id: "nisab-agricultural",
        q: "Is there a Nisab threshold for agricultural Zakat?",
        a: "Yes, the Nisab for agricultural produce is 5 wasaq (approximately 653 kg or 1,440 lbs) of the harvested crop. If your harvest is less than this amount, no Zakat is due. This threshold applies to each type of crop separately.",
        references: [
          { name: "Sahih Bukhari - Agricultural Nisab", url: "https://sunnah.com/bukhari/24" },
          { name: "Islamic Scholars Consensus", url: "https://www.islamic-scholars.com" }
        ],
        tags: ["nisab", "wasaq", "threshold"]
      },
      {
        id: "mixed-farming",
        q: "How do I calculate Zakat for mixed farming operations?",
        a: "Calculate Zakat separately for each type of crop based on its harvest value. If you also have livestock or other agricultural income, these are calculated separately. Keep detailed records of each crop's harvest and value for accurate Zakat calculation.",
        references: [
          { name: "Islamic Fiqh Academy - Mixed Farming", url: "https://www.fiqhacademy.org" },
          { name: "Contemporary Islamic Finance", url: "https://www.islamicfinance.com" }
        ],
        tags: ["mixed-farming", "separate-calculation", "records"]
      }
    ]
  },
  livestock: {
    title: "Livestock Zakat",
    questions: [
      {
        id: "livestock-nisab",
        q: "What is the Nisab for different types of livestock?",
        a: "The Nisab varies by livestock type: Camels (5), Cattle (30), Sheep/Goats (40). You only pay Zakat if you own the minimum number or more. The rates and calculations are complex and vary by animal type and number owned.",
        references: [
          { name: "Sahih Bukhari - Livestock Zakat", url: "https://sunnah.com/bukhari/24" },
          { name: "Islamic Fiqh Academy - Livestock", url: "https://www.fiqhacademy.org" }
        ],
        tags: ["livestock", "nisab", "animals"]
      },
      {
        id: "livestock-calculation",
        q: "How is Zakat calculated on livestock?",
        a: "Livestock Zakat is calculated based on the number of animals owned and their type. For example, for sheep/goats: 40-120 animals = 1 sheep, 121-200 = 2 sheep, etc. The calculation is complex and varies significantly by animal type.",
        references: [
          { name: "Islamic Scholars Consensus", url: "https://www.islamic-scholars.com" },
          { name: "Contemporary Islamic Finance", url: "https://www.islamicfinance.com" }
        ],
        tags: ["calculation", "rates", "complex"]
      },
      {
        id: "livestock-timing",
        q: "When do I pay Zakat on livestock?",
        a: "Zakat on livestock is due annually when you've owned the animals for one complete lunar year. The animals must be grazing animals (not working animals) and must have been owned for the full year to be zakatable.",
        references: [
          { name: "Islamic Fiqh Academy - Livestock Timing", url: "https://www.fiqhacademy.org" },
          { name: "Contemporary Islamic Finance", url: "https://www.islamicfinance.com" }
        ],
        tags: ["timing", "grazing", "working-animals"]
      },
      {
        id: "mixed-livestock",
        q: "How do I calculate Zakat for mixed livestock?",
        a: "Calculate Zakat separately for each type of livestock. Don't combine different types (e.g., don't mix sheep and goats). Each type has its own Nisab and calculation method. Keep separate records for each livestock type.",
        references: [
          { name: "Islamic Scholars Consensus", url: "https://www.islamic-scholars.com" },
          { name: "Contemporary Islamic Finance", url: "https://www.islamicfinance.com" }
        ],
        tags: ["mixed", "separate", "types"]
      }
    ]
  },
  investments: {
    title: "Investment & Stocks Zakat",
    questions: [
      {
        id: "stock-zakat",
        q: "Do I pay Zakat on stocks and shares?",
        a: "Yes, you pay Zakat on stocks and shares at 2.5% of their current market value. This applies to both individual stocks and mutual funds. Calculate based on the market value on your Zakat due date, not the purchase price.",
        references: [
          { name: "Islamic Fiqh Academy - Stock Zakat", url: "https://www.fiqhacademy.org" },
          { name: "Contemporary Islamic Finance", url: "https://www.islamicfinance.com" }
        ],
        tags: ["stocks", "shares", "market-value"]
      },
      {
        id: "mutual-funds",
        q: "How do I calculate Zakat on mutual funds?",
        a: "Calculate Zakat on mutual funds at 2.5% of the current market value of your units. Use the net asset value (NAV) on your Zakat due date. If the fund invests in non-zakatable assets (like bonds), you may need to calculate based on the fund's underlying assets.",
        references: [
          { name: "Islamic Scholars Consensus", url: "https://www.islamic-scholars.com" },
          { name: "Contemporary Islamic Finance", url: "https://www.islamicfinance.com" }
        ],
        tags: ["mutual-funds", "nav", "underlying-assets"]
      },
      {
        id: "retirement-accounts",
        q: "Do I pay Zakat on retirement accounts (401k, IRA)?",
        a: "You pay Zakat on retirement accounts if you have control over the investments. Calculate 2.5% on the current market value. However, if the account is employer-controlled and you cannot access it until retirement, some scholars exempt it from Zakat until you can access it.",
        references: [
          { name: "Islamic Fiqh Academy - Retirement Accounts", url: "https://www.fiqhacademy.org" },
          { name: "Contemporary Islamic Finance", url: "https://www.islamicfinance.com" }
        ],
        tags: ["retirement", "401k", "ira", "control"]
      },
      {
        id: "real-estate-investment",
        q: "Do I pay Zakat on real estate investments?",
        a: "You don't pay Zakat on real estate you own for personal use. However, if you own real estate for investment purposes (rental income), you pay Zakat on the rental income received, not the property value. The property itself is not zakatable.",
        references: [
          { name: "Islamic Scholars Consensus", url: "https://www.islamic-scholars.com" },
          { name: "Contemporary Islamic Finance", url: "https://www.islamicfinance.com" }
        ],
        tags: ["real-estate", "rental", "income"]
      }
    ]
  }
};

export function getAllFAQCategories() {
  return Object.keys(faqData);
}

export function getFAQByCategory(category) {
  return faqData[category] || null;
}

export function getAllFAQs() {
  const allFAQs = [];
  Object.keys(faqData).forEach(category => {
    faqData[category].questions.forEach(q => {
      allFAQs.push({
        ...q,
        category: category,
        categoryTitle: faqData[category].title
      });
    });
  });
  return allFAQs;
}

export function searchFAQs(searchTerm) {
  const allFAQs = getAllFAQs();
  const term = searchTerm.toLowerCase();
  
  return allFAQs.filter(faq => 
    faq.q.toLowerCase().includes(term) ||
    faq.a.toLowerCase().includes(term) ||
    (faq.tags && faq.tags.some(tag => tag.toLowerCase().includes(term)))
  );
} 