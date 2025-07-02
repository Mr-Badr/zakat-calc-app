// Educational content for each zakat type, to be used in /zakat/[type] pages
// Each section should be filled in for all supported languages

export const zakatTypesContent = {
  money: {
    intro: {
      en: 'Zakat on cash and savings is a core obligation for every Muslim who owns wealth above the nisab for a full lunar year. It purifies your wealth and supports those in need.',
      ar: 'زكاة المال النقدي والادخار فريضة أساسية على كل مسلم يملك مالاً يتجاوز النصاب لمدة سنة هجرية. تطهر المال وتدعم المحتاجين.',
      fr: 'La zakat sur l’argent liquide et les économies est une obligation fondamentale pour tout musulman possédant une richesse supérieure au nisab pendant une année lunaire complète. Elle purifie la richesse et aide les nécessiteux.'
    },
    conditions: {
      en: [
        'Muslim, adult, sane, and free.',
        'Owns wealth above the nisab (minimum threshold) for one lunar year (hawl).',
        'Wealth is fully owned and accessible.'
      ],
      ar: [
        'مسلم، بالغ، عاقل، حر.',
        'يمتلك مالاً يتجاوز النصاب لمدة سنة هجرية (الحول).',
        'المال مملوك بالكامل وقابل للتصرف.'
      ],
      fr: [
        'Musulman, adulte, sain d’esprit, libre.',
        'Possède une richesse supérieure au nisab pendant une année lunaire (hawl).',
        'La richesse est pleinement possédée et accessible.'
      ]
    },
    calculation: {
      en: 'Add all your cash, bank balances, and savings. Subtract any debts due. If the remaining amount is above the nisab, pay 2.5%.',
      ar: 'اجمع كل أموالك النقدية، الأرصدة البنكية، والمدخرات. اطرح الديون المستحقة. إذا تجاوز المبلغ النصاب، أخرج 2.5%.',
      fr: 'Additionnez tout votre argent liquide, vos soldes bancaires et vos économies. Soustrayez les dettes dues. Si le montant restant dépasse le nisab, payez 2,5%.'
    },
    example: {
      en: 'Example: You have $5,000 in savings. You owe $500. Your net is $4,500. If the nisab is $4,000, you pay 2.5% of $4,500 = $112.50.',
      ar: 'مثال: لديك 20,000 ريال مدخرات. عليك دين 2,000 ريال. الصافي 18,000 ريال. إذا كان النصاب 17,000 ريال، تدفع 2.5% من 18,000 = 450 ريال.',
      fr: 'Exemple : Vous avez 5 000 € d’économies. Vous devez 500 €. Votre net est de 4 500 €. Si le nisab est de 4 000 €, vous payez 2,5% de 4 500 = 112,50 €.'
    },
    madhhabNotes: {
      en: [
        'Hanafi: Nisab is based on silver (595g).',
        'Maliki/Shafi’i/Hanbali: Nisab is based on gold (85g).',
        'All: Zakat is 2.5% after one lunar year.'
      ],
      ar: [
        'الحنفي: النصاب بالفضة (595 جم).',
        'المالكي/الشافعي/الحنبلي: النصاب بالذهب (85 جم).',
        'الجميع: الزكاة 2.5% بعد الحول.'
      ],
      fr: [
        'Hanafi : nisab basé sur l’argent (595g).',
        'Maliki/Shafi’i/Hanbali : nisab basé sur l’or (85g).',
        'Tous : zakat de 2,5% après un an lunaire.'
      ]
    },
    faq: {
      en: [
        { q: 'What is the nisab for cash?', a: '85g gold or 595g silver value.' },
        { q: 'Can I pay zakat before a year passes?', a: 'Permissible, but best after hawl.' },
        { q: 'Do I include money lent to others?', a: 'Yes, if you expect repayment.' },
        { q: 'Is zakat due on children’s savings?', a: 'Yes, if above nisab.' },
        { q: 'Can I pay zakat in advance?', a: 'Yes, but best to wait for hawl.' }
      ],
      ar: [
        { q: 'ما هو نصاب زكاة المال؟', a: '85 جرام ذهب أو 595 جرام فضة.' },
        { q: 'هل يجوز تعجيل الزكاة قبل الحول؟', a: 'يجوز، والأفضل بعد الحول.' },
        { q: 'هل أزكي المال الذي أقرضته للآخرين؟', a: 'نعم، إذا كنت تتوقع استرداده.' },
        { q: 'هل تجب الزكاة على مدخرات الأطفال؟', a: 'نعم، إذا تجاوزت النصاب.' },
        { q: 'هل يجوز دفع الزكاة مقدماً؟', a: 'يجوز، والأفضل بعد الحول.' }
      ],
      fr: [
        { q: 'Quel est le nisab pour l’argent ?', a: '85g d’or ou 595g d’argent.' },
        { q: 'Puis-je payer la zakat avant un an ?', a: 'C’est permis, mais préférable après le hawl.' },
        { q: 'Dois-je inclure l’argent prêté à d’autres ?', a: 'Oui, si vous attendez le remboursement.' },
        { q: 'La zakat est-elle due sur les économies des enfants ?', a: 'Oui, si elles dépassent le nisab.' },
        { q: 'Puis-je payer la zakat à l’avance ?', a: 'Oui, mais il est préférable d’attendre le hawl.' }
      ]
    },
    internalLinks: ['gold', 'business', 'debts'],
    cta: { en: 'Start Your Calculation Now', ar: 'ابدأ حسابك الآن', fr: 'Commencez votre calcul maintenant' }
  },
  gold: {
    what: {
      en: 'Zakat on Gold and Silver',
      ar: 'زكاة الذهب والفضة',
      fr: 'Zakat sur l’or et l’argent'
    },
    who: {
      en: 'Anyone who owns gold or silver above the nisab for a full lunar year.',
      ar: 'كل من يملك ذهباً أو فضة تتجاوز النصاب لمدة سنة هجرية.',
      fr: 'Toute personne possédant de l’or ou de l’argent dépassant le nisab pendant une année lunaire.'
    },
    how: {
      en: '1. Weigh your gold/silver.\n2. If above nisab (85g gold, 595g silver), pay 2.5% of value.',
      ar: '١. زن الذهب/الفضة.\n٢. إذا تجاوز النصاب (85 جم ذهب، 595 جم فضة)، أخرج 2.5% من القيمة.',
      fr: '1. Pesez votre or/argent.\n2. Si le montant dépasse le nisab (85g or, 595g argent), payez 2,5% de la valeur.'
    },
    evidences: {
      en: 'Qur’an: 9:34, 9:60. Hadith: Nisab hadiths. See IslamQA, IslamWeb.',
      ar: 'القرآن: التوبة 34، 60. الحديث: أحاديث النصاب. راجع IslamQA وIslamWeb.',
      fr: 'Coran : 9:34, 9:60. Hadith : hadiths sur le nisab. Voir IslamQA, IslamWeb.'
    },
    fiqh: {
      en: 'Hanafi: Zakat on all gold, including jewelry. Maliki/Shafi’i: Not on personal jewelry. Hanbali: Precaution is to pay.',
      ar: 'الحنفي: الزكاة على كل الذهب حتى الحلي. المالكي/الشافعي: لا زكاة على الحلي الشخصي. الحنبلي: الاحتياط إخراجها.',
      fr: 'Hanafi : zakat sur tout l’or, y compris les bijoux. Maliki/Shafi’i : pas sur les bijoux personnels. Hanbali : précaution de payer.'
    },
    faq: {
      en: [
        { q: 'Is zakat due on gold jewelry?', a: 'Hanafi: Yes. Others: Not if for personal use.' },
        { q: 'What is the nisab for gold?', a: '85g pure gold.' }
      ],
      ar: [
        { q: 'هل تجب الزكاة على الذهب المستخدم للزينة؟', a: 'الحنفي: نعم. غيرهم: لا إذا كان للاستعمال الشخصي.' },
        { q: 'ما هو نصاب الذهب؟', a: '85 جرام ذهب خالص.' }
      ],
      fr: [
        { q: 'La zakat est-elle due sur les bijoux en or ?', a: 'Hanafi : Oui. Autres : Non si usage personnel.' },
        { q: 'Quel est le nisab pour l’or ?', a: '85g d’or pur.' }
      ]
    },
    cta: { en: 'Calculate Now', ar: 'احسب الآن', fr: 'Calculez maintenant' },
    internalLinks: ['money', 'business']
  },
  business: {
    what: {
      en: 'Zakat on Trade Goods',
      ar: 'زكاة عروض التجارة',
      fr: 'Zakat sur les biens commerciaux'
    },
    who: {
      en: 'Anyone who owns trade goods for sale above the nisab for a full lunar year.',
      ar: 'كل من يملك بضائع تجارية تتجاوز النصاب لمدة سنة هجرية.',
      fr: 'Toute personne possédant des biens commerciaux dépassant le nisab pendant une année lunaire.'
    },
    how: {
      en: '1. Value your inventory at market price.\n2. Add receivables, subtract payables.\n3. If above nisab, pay 2.5%.',
      ar: '١. قدّر البضائع بسعر السوق.\n٢. أضف الديون المستحقة واطرح الديون المطلوبة.\n٣. إذا تجاوز النصاب، أخرج 2.5%.',
      fr: '1. Évaluez votre stock au prix du marché.\n2. Ajoutez les créances, soustrayez les dettes.\n3. Si le montant dépasse le nisab, payez 2,5%.'
    },
    evidences: {
      en: 'Qur’an: 2:267. Hadith: Trade zakat. See IslamQA, IslamWeb.',
      ar: 'القرآن: البقرة 267. الحديث: زكاة التجارة. راجع IslamQA وIslamWeb.',
      fr: 'Coran : 2:267. Hadith : zakat du commerce. Voir IslamQA, IslamWeb.'
    },
    fiqh: {
      en: 'All schools: Zakat is due on trade goods at market value after one lunar year. Debts are subtracted.',
      ar: 'جميع المذاهب: الزكاة على البضائع بسعر السوق بعد الحول. تطرح الديون.',
      fr: 'Toutes les écoles : zakat sur les biens au prix du marché après un an lunaire. Les dettes sont soustraites.'
    },
    faq: {
      en: [
        { q: 'How do I value trade goods?', a: 'At current market price.' },
        { q: 'Are business debts subtracted?', a: 'Yes, subtract payables from assets.' }
      ],
      ar: [
        { q: 'كيف أقدر قيمة البضائع التجارية؟', a: 'بسعر السوق الحالي.' },
        { q: 'هل تطرح الديون التجارية؟', a: 'نعم، تطرح الديون المطلوبة من الأصول.' }
      ],
      fr: [
        { q: 'Comment évaluer les biens commerciaux ?', a: 'Au prix du marché actuel.' },
        { q: 'Les dettes commerciales sont-elles soustraites ?', a: 'Oui, soustrayez les dettes des actifs.' }
      ]
    },
    cta: { en: 'Calculate Now', ar: 'احسب الآن', fr: 'Calculez maintenant' },
    internalLinks: ['money', 'gold']
  },
  agriculture: {
    what: { en: '', ar: '', fr: '' },
    who: { en: '', ar: '', fr: '' },
    how: { en: '', ar: '', fr: '' },
    evidences: { en: '', ar: '', fr: '' },
    fiqh: { en: '', ar: '', fr: '' },
    faq: { en: '', ar: '', fr: '' },
    cta: { en: '', ar: '', fr: '' },
    internalLinks: ['livestock']
  },
  livestock: {
    what: { en: '', ar: '', fr: '' },
    who: { en: '', ar: '', fr: '' },
    how: { en: '', ar: '', fr: '' },
    evidences: { en: '', ar: '', fr: '' },
    fiqh: { en: '', ar: '', fr: '' },
    faq: { en: '', ar: '', fr: '' },
    cta: { en: '', ar: '', fr: '' },
    internalLinks: ['agriculture']
  },
  stocks: {
    what: { en: '', ar: '', fr: '' },
    who: { en: '', ar: '', fr: '' },
    how: { en: '', ar: '', fr: '' },
    evidences: { en: '', ar: '', fr: '' },
    fiqh: { en: '', ar: '', fr: '' },
    faq: { en: '', ar: '', fr: '' },
    cta: { en: '', ar: '', fr: '' },
    internalLinks: ['money', 'business']
  },
  debts: {
    what: { en: '', ar: '', fr: '' },
    who: { en: '', ar: '', fr: '' },
    how: { en: '', ar: '', fr: '' },
    evidences: { en: '', ar: '', fr: '' },
    fiqh: { en: '', ar: '', fr: '' },
    faq: { en: '', ar: '', fr: '' },
    cta: { en: '', ar: '', fr: '' },
    internalLinks: ['money', 'business']
  },
  minerals: {
    what: { en: '', ar: '', fr: '' },
    who: { en: '', ar: '', fr: '' },
    how: { en: '', ar: '', fr: '' },
    evidences: { en: '', ar: '', fr: '' },
    fiqh: { en: '', ar: '', fr: '' },
    faq: { en: '', ar: '', fr: '' },
    cta: { en: '', ar: '', fr: '' },
    internalLinks: ['money', 'gold']
  }
}; 