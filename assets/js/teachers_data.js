/**
 * Единый реестр педагогов школы №9
 * Используется для страниц «Педагогический состав» и «Методические объединения»
 */
const teachersData = [
    {
        id: "teacher_saparova_nk",
        name_ru: "Сапарова Нургуль Каиржановна",
        name_kk: "Сапарова Нұргүл Қайыржанқызы",
        mo_id: 2, // Естественно-математический цикл
        is_head: true,
        position_ru: "Учитель математики",
        position_kk: "Математика мұғалімі",
        category_ru: "Педагог-мастер",
        category_kk: "Педагог-шебер",
        experience: 25,
        photo: "/assets/images/teachers/default_avatar.webp",
        education_ru: ["КазНПУ им. Абая, 1995"],
        education_kk: ["Абай атындағы ҚазҰПУ, 1995"],
        subjects: ["math"],
        tags: ["Математика", "Геометрия"]
    },
    {
        id: "teacher_shakirova_ak",
        name_ru: "Шакирова Айгуль Каримовна",
        name_kk: "Шәкірова Айгүл Кәрімқызы",
        mo_id: 1, // Начальные классы
        is_head: true,
        position_ru: "Учитель начальных классов",
        position_kk: "Бастауыш сынып мұғалімі",
        category_ru: "Педагог-исследователь",
        category_kk: "Педагог-зерттеуші",
        experience: 18,
        photo: "/assets/images/teachers/default_avatar.webp",
        subjects: ["primary"],
        tags: ["Начальные классы"]
    },
    {
        id: "teacher_rahmanova_ga",
        name_ru: "Рахманова Гульмира Аманжоловна",
        name_kk: "Рахманова Гүлмира Аманжолқызы",
        mo_id: 3, // Казахский язык
        is_head: true,
        position_ru: "Учитель казахского языка и литературы",
        position_kk: "Қазақ тілі мен әдебиеті мұғалімі",
        category_ru: "Педагог-мастер",
        category_kk: "Педагог-шебер",
        experience: 28,
        photo: "/assets/images/teachers/default_avatar.webp",
        subjects: ["language"],
        tags: ["Қазақ тілі", "Әдебиет"]
    },
    {
        id: "teacher_nurmagambetov_as",
        name_ru: "Нурмагамбетов Асхат Серикович",
        name_kk: "Нұрмағамбетов Асхат Серікұлы",
        mo_id: 2,
        is_head: false,
        position_ru: "Учитель физики",
        position_kk: "Физика мұғалімі",
        category_ru: "Педагог-исследователь",
        category_kk: "Педагог-зерттеуші",
        experience: 15,
        photo: "/assets/images/teachers/default_avatar.webp",
        subjects: ["physics"],
        tags: ["Физика", "Робототехника"]
    },
    {
        id: "teacher_petrov_if",
        name_ru: "Петров Иван Федорович",
        name_kk: "Петров Иван Федорович",
        mo_id: 2,
        is_head: false,
        position_ru: "Учитель информатики",
        position_kk: "Информатика мұғалімі",
        category_ru: "Педагог-модератор",
        category_kk: "Педагог-модератор",
        experience: 12,
        photo: "/assets/images/teachers/teacher_petrov.webp",
        subjects: ["informatics"],
        tags: ["AI", "Python"]
    },
    {
        id: "teacher_sagiev_e",
        name_ru: "Сагиев Ерлан",
        name_kk: "Сағиев Ерлан",
        mo_id: 6, // Естественно-научный цикл
        is_head: true,
        position_ru: "Учитель химии",
        position_kk: "Химия мұғалімі",
        category_ru: "Педагог-исследователь",
        category_kk: "Педагог-зерттеуші",
        experience: 20,
        photo: "/assets/images/teachers/default_avatar.webp",
        subjects: ["chemistry"],
        tags: ["Химия", "Проекты"]
    },
    {
        id: "teacher_kozhanov_m",
        name_ru: "Кожанов Марат",
        name_kk: "Қожанов Марат",
        mo_id: 7, // Общественно-гуманитарный цикл
        is_head: true,
        position_ru: "Учитель истории",
        position_kk: "Тарих мұғалімі",
        category_ru: "Педагог-модератор",
        category_kk: "Педагог-модератор",
        experience: 10,
        photo: "/assets/images/teachers/default_avatar.webp",
        subjects: ["history-law"],
        tags: ["История", "Музей"]
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = teachersData;
}
