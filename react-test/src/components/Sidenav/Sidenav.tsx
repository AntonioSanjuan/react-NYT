import useUser from '../../hooks/login/userHook';
import { useAppSelector } from '../../hooks/state/appStateHook';
import { selectUserIsLogged } from '../../state/user/user.selectors';
import { Section } from '../common/section/section';
import './Sidenav.scss'

function Sidenav() {
    const isLoggedIn = useAppSelector<boolean>(selectUserIsLogged);

    const { logout } = useUser()

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
                            <Section 
                            sectionName={'Most Popular Articles'}>
                                <i className="bi bi-bar-chart-line-fill"></i>
                            </Section>
                        </div>
                        <div className="sidenav_Section">
                            <Section sectionName={'to-do'}>
                                <i className="bi bi-clock-fill"></i>
                            </Section>
                        </div>
                    </div>
                <div className="sidenav_FooterSection">
                    <div className="sidenav_Section">
                        <Section sectionName={"'Contact'"}>
                            <i className="bi bi-chat-left-dots-fill"></i>
                        </Section>
                    </div>
                    <div style={{visibility: isLoggedIn ? 'visible': 'hidden'}} onClick={logout} className="sidenav_Section" id="exitSection">
                        <Section sectionName={"'Exit'"}>
                        <i className="bi bi-box-arrow-right"></i>
                        </Section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export {Sidenav}
