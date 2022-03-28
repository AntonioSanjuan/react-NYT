import ProfileSettings from './components/profileSettings/profileSettings';
import './Profile.scss';

function ProfilePage() {
    return (
    <>
        <div className='Profile_MainContainer'>
            <div className='Profile_SettingsContainer'>
                <p className="app_font_l">User Settings</p>
                <ProfileSettings />
            </div>
        </div>
    </>
    )
}

export default ProfilePage;