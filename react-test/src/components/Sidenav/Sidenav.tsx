import './Sidenav.scss'

function Sidenav() {

    return (
            <div className="sidenav_MainContainer">
                <div className="sidenav_NavContainer">
                    <div>
                        <div className="sidenav_ProfileSection">
                        </div>
                        <div className="sidenav_Search">
                            <p className="app_font_m">Search content</p>
                        </div>
                        <div className="sidenav_Section">
                        </div>
                        <div className="sidenav_Section">
                        </div>
                    </div>
                <div className="sidenav_FooterSection">
                    <div className="sidenav_Section">
                    </div>
                    <div className="sidenav_Section" id="exitSection">
                    </div>
                </div>
            </div>
        </div>
    );
}

export {Sidenav}
