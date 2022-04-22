import './Sidenav.scss';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/user/userHook';
import { useSidenavLayer } from '../../hooks/sidenav/sidenavHook';
import { useAppSelector } from '../../hooks/state/appStateHook';
import { selectUserIsLogged } from '../../state/user/user.selectors';
import { ProfileSection } from '../common/profileSection/profileSection';
import { Search } from '../common/search/search';
import { Section } from '../common/section/section';
import { useAlert } from '../../hooks/alert/alertHook';
import { DynamicModalTypes } from '../../models/internal/types/DynamicModalEnum.model';

function Sidenav() {
  const isLoggedIn = useAppSelector<boolean>(selectUserIsLogged);
  const navigate = useNavigate();

  const { logout } = useUser();
  const { openAlert } = useAlert();
  const { switchSidenavStatus } = useSidenavLayer();

  const handleNavigation = (dest: string) => {
    navigate(dest);
    switchSidenavStatus();
  };

  const handleSearch = (searchInput: string) => {
    handleNavigation('/');
  };

  const handleOpenSettings = () => {
    switchSidenavStatus();
    openAlert(DynamicModalTypes.ProfileSettings);
  };

  return (
    <div className="sidenav_MainContainer">
      <div className="sidenav_NavContainer">
        <div>
          <div className="sidenav_ProfileSection">
            <ProfileSection />
          </div>
          <div className="sidenav_Search">
            <p className="app_font_m">Search content</p>
            <Search
              searchOutput={handleSearch}
            />
          </div>
          <div className="sidenav_Section" onClick={() => { handleNavigation('/'); }}>
            <Section
              sectionName="Popular Articles"
            >
              <i className="bi bi-book-fill" />
            </Section>
          </div>
          <div className="sidenav_Section" style={{ display: isLoggedIn ? 'inherit' : 'none' }} onClick={() => { handleNavigation('/storedArticles'); }}>
            <Section
              sectionName="Stored Articles"
            >
              <i className="bi bi-bookmark-star-fill" />
            </Section>
          </div>
          <div className="sidenav_Section">
            <Section sectionName="to-do">
              <i className="bi bi-clock-fill" />
            </Section>
          </div>
        </div>
        <div className="sidenav_FooterSection">
          <div className="sidenav_Section" onClick={() => { handleOpenSettings(); }}>
            <Section
              sectionName="Settings"
            >
              <i className="bi bi-gear-fill" />
            </Section>
          </div>
          <div className="sidenav_Section" onClick={() => { handleNavigation('/contact'); }}>
            <Section
              sectionName="Contact"
            >
              <i className="bi bi-chat-left-dots-fill" />
            </Section>
          </div>
          <div style={{ visibility: isLoggedIn ? 'visible' : 'hidden' }} onClick={logout} className="sidenav_Section">
            <Section
              sectionName="Exit"
              color="var(--app-error-color)"
            >
              <i className="bi bi-box-arrow-right" />
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Sidenav };
