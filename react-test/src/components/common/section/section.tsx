import './section.scss'

function Section({children, sectionName} : {children: any, sectionName: string}) {

    return (
        <>
        {
         <div className="Section_MainContainer">
            <div className="Section_ImageContainer">
                {children}
            </div>
            <div className="Section_DataContainer">
                <p className="app_font_m">{sectionName}</p>
            </div>
        </div>   
        }
        </>
    )
}

export {Section}