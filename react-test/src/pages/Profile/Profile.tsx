import { useTranslation } from 'react-i18next';
import ProfileSettings from './components/profileSettings/profileSettings';
import './Profile.scss';

function ProfilePage() {
    const { t } = useTranslation();

    return (
    <>
        <div className='Profile_MainContainer'>
            <div className='Profile_SettingsContainer'>
                <p className="app_font_l">User Settings</p>
                <ProfileSettings />
                <p className='app_font_m'> 
                    {t('welcome')}
                </p>
            </div>
        </div>
    </>
    )
}

export default ProfilePage;