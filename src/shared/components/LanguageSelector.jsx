import { useTranslation } from "react-i18next"

export function LanguageSelector(){
    
    const {i18n} = useTranslation();
    const onSelectLanguage = (language) => {
        i18n.changeLanguage(language);
        localStorage.setItem("lang",language);
    }

    return (
        <div  className="text-center">
            <br/>
            <img
            role="button"
            src="https://flagcdn.com/16x12/tr.png"
            width="32"
            height="24"
            alt="Türkçe"
            onClick={() => onSelectLanguage('tr')}></img>
            &nbsp;
            <img
            role="button"
            src="https://flagcdn.com/16x12/us.png"
            width="32"
            height="24"
            alt="English"
            onClick={() => onSelectLanguage('en')}></img>

        </div>
    )
}