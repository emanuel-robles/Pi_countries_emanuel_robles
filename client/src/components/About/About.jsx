import style from "../About/About.module.css"

const About = () => {
  return (
    <div >
      <h1 className={style.content}>  Proyecto Realizado Por Emanuel Robles.</h1>
      <h2 className={style.content1} >Definicion del proyecto:</h2>
      <p className={style.content2} >El proyecto consiste en realizar una pagina web que 
        filtre,cree y muestre diversos paises.El contexto general
        de la aplicacion cumple con los parametros establecidos.</p>
        <h3 className={style.content1} >Datos de contacto del desarrollador web:</h3>
        <p className={style.content2} >nombre: Emanuel Robles Avila</p>
        <p className={style.content2} >contacto: +56984370953</p>
      
        <p className={style.content2}  >linkedin:  <a href="https://www.linkedin.com/in/emanuel-robles-52a7661bb/"> https://www.linkedin.com/in/emanuel-robles-52a7661bb/ </a>  </p>
    </div>
  )
}

export default About