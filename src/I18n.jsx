import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import {initReactI18next} from "react-i18next"


i18n.use(LanguageDetector).use(initReactI18next).init({
    /**
     * Internationalisation and Localisation are used to provide appropriate translation with web browser language detection.
     * Switching directly the language of the browser may not translate subcommands.
     * @default Promise
     */
    detection: {},
    resources: {
        ar: {
            translation: {
                home: "مرحبًا بك في محاكي Python web terminal على Pyodide عبر WebAssembly\nيتوفر أيضًا منشئ صور SVG الرمزية عن طريق كتابة الأمر gen (مدرج في التعليمات) أدناه",
                help: {
                    alpha: "اكتب help () للحصول على تعليمات تفاعلية ، أو تعليمات (كائن) للحصول على تعليمات حول الكائن.\n\nقائمة الأوامر",
                    audio: "لتشغيل صوت",
                    cat: "أداة قياسية تقرأ الملفات بالتسلسل",
                    cd: "أمر shell بسطر الأوامر يُستخدم لتغيير دليل العمل الحالي",
                    clear: "مسح شاشة الجهاز",
                    cls: "يمسح المحطة",
                    exit: "استخدم خروج () أو Ctrl-D (أي EOF) للخروج",
                    gen: "إظهار الصورة الرمزية لرسومات Vector Scalable ذات الشكل الجمالي",
                    help: "تستخدم للمعلومات أو الاستخدام التفاعلي",
                    lang: "السماح بتغيير اللغة ديناميكيًا",
                    lipsum: "لوريم إيبسوم هو عرض نصي لعنصر نائب",
                    ls: "يمكنه سرد الملفات والأدلة",
                    mode: "تغيير وضع الخلفية إلى الظلام / الفاتح",
                    quit: "استخدم quit () أو Ctrl-D (أي EOF) للإنهاء",
                    reboot: "يستخدم لإعادة تشغيل المثيل الحالي",
                    version: "معلومات حول إصدار Python للمثيل"
                },
                old: "متصفحك غير مدعوم هنا. يرجى التحديث إلى أحدث."
            }
        },
        bn: {
            translation: {
                home: "Pyodide ওভার WebAssembly-এ পাইথন ওয়েব টার্মিনাল এমুলেটরে স্বাগতম\nনীচে gen কমান্ড (সহায়তায় তালিকাভুক্ত) টাইপ করে একটি SVG অবতার জেনারেটরও উপলব্ধ রয়েছে",
                help: {
                    alpha: "ইন্টারেক্টিভ সাহায্যের জন্য help() টাইপ করুন, অথবা অবজেক্ট সম্পর্কে সাহায্যের জন্য help(object) টাইপ করুন।\n\nকমান্ড তালিকা",
                    audio: "একটি শব্দ বাজাতে",
                    cat: "একটি স্ট্যান্ডার্ড ইউটিলিটি যা ফাইলগুলিকে ক্রমানুসারে পড়ে",
                    cd: "একটি কমান্ড-লাইন শেল কমান্ড বর্তমান কার্যকারী ডিরেক্টরি পরিবর্তন করতে ব্যবহৃত হয়",
                    clear: "টার্মিনাল স্ক্রীন সাফ করা হচ্ছে",
                    cls: "টার্মিনাল সাফ করে",
                    exit: "প্রস্থান করতে exit() বা Ctrl-D (অর্থাৎ EOF) ব্যবহার করুন",
                    gen: "একটি নান্দনিক স্কেলেবল ভেক্টর গ্রাফিক্স অবতার দেখানো হচ্ছে",
                    help: "তথ্য বা ইন্টারেক্টিভ ব্যবহারের জন্য ব্যবহৃত হয়",
                    lang: "গতিশীলভাবে ভাষা পরিবর্তন করার অনুমতি দেয়",
                    lipsum: "Lorem Ipsum হল একটি স্থানধারক পাঠ্য প্রদর্শন",
                    ls: "এটি ফাইল এবং ডিরেক্টরি তালিকা করতে পারে",
                    mode: "পটভূমি মোড অন্ধকার/আলোতে পরিবর্তন করা হচ্ছে",
                    quit: "প্রস্থান করতে quit() বা Ctrl-D (অর্থাৎ EOF) ব্যবহার করুন",
                    reboot: "বর্তমান উদাহরণ পুনরায় আরম্ভ করতে ব্যবহৃত",
                    version: "উদাহরণের পাইথন সংস্করণ সম্পর্কে তথ্য"
                },
                old: "আপনার ব্রাউজার এখানে সমর্থিত নয়। একটি আরো সাম্প্রতিক একটি আপডেট করুন."
            }
        },
        de: {
            translation: {
                home: `Willkommen beim Python-Webterminal-Emulator auf Pyodide über WebAssembly im Jahr ${new Date().getFullYear()} ⚙️\nEs gibt auch einen SVG-Avatar-Generator, der durch Eingabe des Befehls gen (in der Hilfe aufgeführt) verfügbar ist`,
                help: {
                    alpha: "Geben Sie help() für interaktive Hilfe ein, oder help(object) für Hilfe zu einem Objekt.\n\nAuflistung der Kommandos",
                    audio: "So spielen Sie einen Ton ab",
                    cat: "Ein Standardprogramm, das Dateien sequentiell liest",
                    cd: "Ein Kommandozeilenbefehl, mit dem das aktuelle Arbeitsverzeichnis gewechselt werden kann",
                    clear: "Löschen des Terminalbildschirms",
                    cls: "Löscht das Terminal",
                    exit: "Verwenden Sie exit() oder Ctrl-D (d.h. EOF) zum Beenden",
                    gen: "Anzeigen eines ästhetischen Avatars mit skalierbaren Vektorgrafiken",
                    help: "Zur Information oder interaktiven Nutzung",
                    lang: "Dynamischer Wechsel der Sprache möglich",
                    lipsum: "Lorem Ipsum ist ein Platzhaltertext zur Demonstration",
                    ls: "Es kann Dateien und Verzeichnisse auflisten",
                    mode: "Ändern des Hintergrundmodus auf dunkel/hell",
                    quit: "Verwenden Sie quit() oder Ctrl-D (d.h. EOF) zum Beenden",
                    reboot: "Wird verwendet, um die aktuelle Instanz neu zu starten",
                    version: "Informationen über die Python-Version der Instanz"
                },
                old: "Ihr Browser wird hier nicht unterstützt. Bitte aktualisieren Sie auf eine neuere."
            }
        },
        en: {
            translation: {
                home: `Welcome to the \x1b[1mPython\x1b[0m web terminal emulator on \x1b[1mPyodide\x1b[0m over \x1b[1mWebAssembly\x1b[0m in ${new Date().getFullYear()} ⚙️\nThere is also a \x1b[1mSVG\x1b[0m avatar generator available by typing \x1b[1mgen\x1b[0m command (listed in \x1b[1mhelp\x1b[0m) below:`,
                help: {
                    alpha: "Type help() for interactive help, or help(object) for help about object.\n\nListing of commands",
                    audio: "To play a sound",
                    cat: "A standard utility that reads files sequentially",
                    cd: "A command-line shell command used to change the current working directory",
                    clear: "Clearing the terminal screen",
                    cls: "Clears the terminal",
                    exit: "Use exit() or Ctrl-D (i.e. EOF) to exit",
                    gen: "Showing an aesthetic Scalable Vector Graphics avatar",
                    help: "Used for information or interactive usage",
                    lang: "Allowing to change the language dynamically",
                    lipsum: "Lorem Ipsum is a placeholder text demonstration",
                    ls: "It can list files and directories",
                    mode: "Changing the background mode to dark/light",
                    quit: "Use quit() or Ctrl-D (i.e. EOF) to quit",
                    reboot: "Used to restart the current instance",
                    version: "Information about the Python version of the instance"
                },
                old: "Your browser is not supported here. Please update to a more recent one."
            }
        },
        es: {
            translation: {
                home: `Bienvenido al emulador de terminal web Python en Pyodide sobre WebAssembly en ${new Date().getFullYear()} ⚙️\nTambién hay un generador de avatares SVG disponible escribiendo el comando gen (listado en la ayuda) a continuación`,
                help: {
                    alpha: "Escriba help() para obtener ayuda interactiva, o help(object) para obtener ayuda sobre el objeto.\n\nLista de comandos",
                    audio: "Para reproducir un sonido",
                    cat: "Una utilidad estándar que lee archivos secuencialmente",
                    cd: "Comando de shell de línea de comandos utilizado para cambiar el directorio de trabajo actual",
                    clear: "Borrar la pantalla del terminal",
                    cls: "Borra el terminal",
                    exit: "Utilice exit() o Ctrl-D (es decir, EOF) para salir",
                    gen: "Mostrar un avatar estético de gráficos vectoriales escalables",
                    help: "Utilizado para información o uso interactivo",
                    lang: "Cambio dinámico de idioma",
                    lipsum: "Lorem Ipsum es una demostración de texto con marcador de posición",
                    ls: "Puede listar archivos y directorios",
                    mode: "Cambiar el modo de fondo a oscuro/claro",
                    quit: "Utilice quit() o Ctrl-D (es decir, EOF) para salir",
                    reboot: "Se utiliza para reiniciar la instancia actual",
                    version: "Información sobre la versión de Python de la instancia"
                },
                old: "Su navegador no es compatible aquí. Actualice a uno más reciente."
            }
        },
        fr: {
            translation: { // LTR
                home: `Bienvenue sur ce terminal web émulant \x1b[1mPython\x1b[0m grâce à \x1b[1mPyodide\x1b[0m et au \x1b[1mWebAssembly\x1b[0m en ${new Date().getFullYear()} ⚙️\nIl y a aussi un générateur d'avatar en \x1b[1mSVG\x1b[0m disponible en écrivant \x1b[1mgen\x1b[0m (listé dans \x1b[1mhelp\x1b[0m) ci-dessous :`,
                help: {
                    alpha: "Tapez help() pour une aide interactive, ou help(objet) pour une aide sur l'objet.\n\nListe des commandes\xa0",
                    audio: "Pour jouer un son",
                    cat: "Un utilitaire standard qui lit les fichiers séquentiellement",
                    cd: "Commande de l'interpréteur de commandes utilisée pour changer le répertoire de travail actuel",
                    clear: "Effacement du terminal",
                    cls: "Efface le terminal",
                    exit: "Utilisez exit() ou Ctrl-D (i.e. EOF) pour fermer",
                    gen: "Montre un avatar esthétique en Graphique Vectoriel Adaptable",
                    help: "Utilisé pour informer ou d'usage interactif",
                    lang: "Permettant de changer de langue dynamiquement",
                    lipsum: "Un Lorem Ipsum est une démonstration de texte de remplacement",
                    ls: "Peut énumérer des fichiers et des dossiers",
                    mode: "Modifie le mode d'arrière-plan pour le rendre sombre/clair",
                    quit: "Utilisez quit() ou Ctrl-D (i.e. EOF) pour fermer",
                    reboot: "Utilisé pour redémarrer l'instance actuelle",
                    version: "Information sur la version Python de l'instance"
                },
                old: "Votre navigateur n'est pas pris en charge ici. Veuillez le mettre à jour avec un plus récent s'il vous plaît."
            }
        },
        hi: {
            translation: {
                home: "WebAssembly पर पायोडाइड पर Python वेब टर्मिनल इम्यूलेटर में आपका स्वागत है\nनीचे gen कमांड (मदद में सूचीबद्ध) टाइप करके एक SVG अवतार जनरेटर भी उपलब्ध है",
                help: {
                    alpha: "इंटरैक्टिव सहायता के लिए सहायता () टाइप करें, या ऑब्जेक्ट सहायता के लिए सहायता (ऑब्जेक्ट)।\n\nआदेशों की सूची",
                    audio: "ध्वनि चलाने के लिए",
                    cat: "एक मानक उपयोगिता जो फ़ाइलों को क्रमिक रूप से पढ़ती है",
                    cd: "शेल कमांड वर्तमान कार्यशील निर्देशिका को बदलने के लिए प्रयोग किया जाता है",
                    clear: "टर्मिनल स्क्रीन को साफ़ करना",
                    cls: "टर्मिनल साफ़ करता है",
                    exit: "बाहर निकलने के लिए बाहर निकलें() या Ctrl-D (यानी ईओएफ) का प्रयोग करें",
                    gen: "एस्थेटिक स्केलेबल वेक्टर ग्राफिक्स अवतार दिखा रहा है",
                    help: "सूचना या इंटरैक्टिव उपयोग के लिए उपयोग किया जाता है",
                    lang: "भाषा को गतिशील रूप से बदलने की अनुमति",
                    lipsum: "लोरेम इप्सम एक प्लेसहोल्डर पाठ प्रदर्शन है",
                    ls: "यह फाइलों और निर्देशिकाओं को सूचीबद्ध कर सकता है",
                    mode: "बैकग्राउंड मोड को डार्क/लाइट में बदला जा रहा है",
                    quit: "छोड़ने के लिए छोड़ें () या Ctrl-D (यानी EOF) का उपयोग करें",
                    reboot: "वर्तमान उदाहरण को पुनरारंभ करने के लिए उपयोग किया जाता है",
                    version: "उदाहरण के पायथन संस्करण के बारे में जानकारी"
                },
                old: "आपका ब्राउज़र यहां समर्थित नहीं है। कृपया एक और हाल ही में अपडेट करें।"
            }
        },
        jp: {
            translation: {
                home: "Pyodide over WebAssembly の Python Web ターミナル エミュレーターへようこそ\n以下の gen コマンド (ヘルプにリストされています) を入力して利用できる SVG アバター ジェネレーターもあります。",
                help: {
                    alpha: "対話型ヘルプの場合は help() と入力し、オブジェクトに関するヘルプの場合は help(object) と入力します。\n\nコマンド一覧",
                    audio: "サウンドを再生するには",
                    cat: "ファイルを順次読み取る標準ユーティリティ",
                    cd: "現在の作業ディレクトリを変更するために使用されるコマンドライン シェル コマンド",
                    clear: "端末画面のクリア",
                    cls: "ターミナルをクリアします",
                    exit: "exit() または Ctrl-D (つまり EOF) を使用して終了します",
                    gen: "美しいスケーラブル ベクター グラフィックス アバターの表示",
                    help: "情報またはインタラクティブな使用に使用",
                    lang: "言語を動的に変更できるようにする",
                    lipsum: "Lorem Ipsum は、プレースホルダー テキストのデモンストレーションです。",
                    ls: "ファイルとディレクトリを一覧表示できます",
                    mode: "背景モードをダーク/ライトに変更する",
                    quit: "終了するには、quit() または Ctrl-D (つまり、EOF) を使用します。",
                    reboot: "現在のインスタンスの再起動に使用",
                    version: "インスタンスの Python バージョンに関する情報"
                },
                old: "お使いのブラウザはここではサポートされていません。 最新のものに更新してください。"
            }
        },
        nl: {
            translation: {
                home: `Welkom bij de Python-webterminalemulator op Pyodide via WebAssembly in ${new Date().getFullYear()} ⚙️\nEr is ook een SVG-avatargenerator beschikbaar door de opdracht gen (vermeld in de help) hieronder te typen`,
                help: {
                    alpha: "Typ help() voor interactieve hulp of help(object) voor hulp over het object.\n\nLijst met opdrachten",
                    audio: "Opsomming van commando's",
                    cat: "Een standaardhulpprogramma dat bestanden opeenvolgend leest",
                    cd: "Een opdrachtregel-shell-opdracht die wordt gebruikt om de huidige werkdirectory te wijzigen",
                    clear: "Het terminalscherm wissen",
                    cls: "Wist de terminal",
                    exit: "Gebruik exit() of Ctrl-D (d.w.z. EOF) om af te sluiten",
                    gen: "Toont een esthetische Scalable Vector Graphics-avatar",
                    help: "Gebruikt voor informatie of interactief gebruik",
                    lang: "Hiermee kan de taal dynamisch worden gewijzigd",
                    lipsum: "Lorem Ipsum is een tijdelijke tekstdemonstratie",
                    ls: "Het kan bestanden en mappen weergeven",
                    mode: "De achtergrondmodus wijzigen in donker/licht",
                    quit: "Gebruik quit() of Ctrl-D (d.w.z. EOF) om te stoppen",
                    reboot: "Wordt gebruikt om de huidige instantie opnieuw op te starten",
                    version: "Informatie over de Python-versie van de instantie"
                },
                old: "Uw browser wordt hier niet ondersteund. Gelieve bij te werken naar een recentere versie."
            }
        },
        ru: {
            translation: {
                home: "Добро пожаловать в эмулятор веб-терминала Python на Pyodide поверх WebAssembly\nСуществует также генератор аватаров SVG, который можно получить, набрав команду gen (указана в справке) ниже",
                help: {
                    alpha: "Введите help() для интерактивной справки или help(object) для справки об объекте.\n\nСписок команд",
                    audio: "Чтобы воспроизвести звук",
                    cat: "Стандартная утилита, которая последовательно читает файлы",
                    cd: "Команда оболочки командной строки, используемая для изменения текущего рабочего каталога",
                    clear: "Очистка экрана терминала",
                    cls: "Очищает терминал",
                    exit: "Используйте exit() или Ctrl-D (например, EOF) для выхода.",
                    gen: "Отображение эстетичного аватара с масштабируемой векторной графикой",
                    help: "Используется для информации или интерактивного использования",
                    lang: "Разрешить менять язык динамически",
                    lipsum: "Lorem Ipsum — демонстрация текста-заполнителя.",
                    ls: "Он может перечислять файлы и каталоги",
                    mode: "Изменение фонового режима на темный/светлый",
                    quit: "Используйте quit() или Ctrl-D (т.е. EOF) для выхода",
                    reboot: "Используется для перезапуска текущего экземпляра",
                    version: "Информация о версии экземпляра Python"
                },
                old: "Ваш браузер здесь не поддерживается. Пожалуйста, обновите его до более свежего."
            }
        },
        uk: {
            translation: {
                home: "Ласкаво просимо до емулятора веб-терміналу Python на Pyodide через WebAssembly\nІснує також генератор аватарів SVG, який можна отримати, ввівши команду gen (наведену в довідці) нижче",
                help: {
                    alpha: "Введіть help() для інтерактивної довідки або help(object) для довідки про об’єкт.\n\nЛістинг команд",
                    audio: "Щоб відтворити звук",
                    cat: "Стандартна утиліта, яка послідовно читає файли",
                    cd: "Команда оболонки командного рядка, яка використовується для зміни поточного робочого каталогу",
                    clear: "Очищення екрана терміналу",
                    cls: "Очищає термінал",
                    exit: "Використовуйте exit() або Ctrl-D (тобто EOF), щоб вийти",
                    gen: "Показ естетичного аватара масштабованої векторної графіки",
                    help: "Використовується для інформації або інтерактивного використання",
                    lang: "Дозволяє динамічно змінювати мову",
                    lipsum: "Lorem Ipsum — це демонстрація тексту-заповнювача",
                    ls: "Він може перераховувати файли та каталоги",
                    mode: "Зміна фонового режиму на темний/світлий",
                    quit: "Використовуйте quit() або Ctrl-D (тобто EOF), щоб вийти",
                    reboot: "Використовується для перезапуску поточного екземпляра",
                    version: "Інформація про версію екземпляра Python"
                },
                old: "Ваш браузер тут не підтримується. Будь ласка, оновіть до новішої версії."
            }
        },
        zh: {
            translation: {
                home: "欢迎使用基于 WebAssembly 的 Pyodide 上的 Python 网络终端模拟器\n通过在下面键入 gen 命令（在帮助中列出），还可以使用 SVG 头像生成器",
                help: {
                    alpha: "键入 help() 以获得交互式帮助，或键入 help(object) 以获得有关对象的帮助。\n\n命令列表",
                    audio: "要播放一个声音",
                    cat: "按顺序读取文件的标准实用程序",
                    cd: "用于更改当前工作目录的命令行 shell 命令",
                    clear: "清除终端屏幕",
                    cls: "清除终端",
                    exit: "使用 exit() 或 Ctrl-D（即 EOF）退出",
                    gen: "显示美观的可缩放矢量图形头像",
                    help: "用于信息或交互用途",
                    lang: "允许动态更改语言",
                    lipsum: "Lorem Ipsum 是一个占位符文本演示",
                    ls: "它可以列出文件和目录",
                    mode: "将背景模式更改为深色/浅色",
                    quit: "使用 quit() 或 Ctrl-D（即 EOF）退出",
                    reboot: "用于重启当前实例",
                    version: "实例Python版本信息"
                },
                old: "此处不支持您的浏览器。 请更新到更新的版本。"
            }
        }
    },
    returnNull: false,
    interpolation: {
        escapeValue: false,
    },
    fallbackLng: "en",
    debug: false
}, null).resolve();

export default i18n;
