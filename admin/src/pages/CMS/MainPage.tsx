import { Divider } from "antd"
import SettingsForm from "../../components/SettingsForm/SettingsForm"
import EmployeeList from "../../components/CMS/Emplayes/Emploes"
import AboutUsFacts from "../../components/CMS/AboutUsFucts/AboutUsFucts"
import AboutUsForm from "../../components/CMS/AboutUs/AboutUsForm"
const MainPage = () => {
  return (
    <div>
      <Divider>Настройки</Divider>
      <SettingsForm />
      <Divider>Сотрудникиды</Divider>
      <EmployeeList />
      <Divider>Факты со страницы о нас</Divider>
      <AboutUsFacts />
      <Divider>О нас</Divider>
      <AboutUsForm />
    </div>
  )
}

export default MainPage
