import NavigationBar from "./NavigationBar"
import SideBar from "./SideBar"
import Header from "./Header"

const Dashboard = () => {
    return (
        <div className='hold-transition sidebar-mini layout-fixed'>
            <div className='wrapper'>
                <NavigationBar />
                <SideBar />
                <Header />
            </div>
        </div>
    )
}

export default Dashboard