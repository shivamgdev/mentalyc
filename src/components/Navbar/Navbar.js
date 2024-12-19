import React from 'react'
import styles from './navbar.module.css'
import logo from '../../assets/Logo.svg'
import noteIcon from '../../assets/noteIcon.svg'
import infoIcon from '../../assets/infoCircle.svg'
import downIcon from '../../assets/downArrow.svg'
import hamburgerIcon from '../../assets/hamburger.svg'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <>
        <nav className={styles.container}>
            <div className={styles.navbarBox}>

                <div className={styles.MenuBox}>
                    <img src={hamburgerIcon} alt="menu" className={styles.hamburger}/>
                

                    <Link to="/" className={styles.logobox}>
                        <img src={logo} alt="logo" />
                        <p>PRO</p>
                    </Link>
                </div>

                <div className={styles.navbarItems}>
                    <NavLink 
                        to="/notes" 
                        className={({ isActive }) => `${styles.items} ${isActive ? styles.active : ''}`}
                    >New notes</NavLink>
                    <NavLink 
                        to="/clients" 
                        className={({ isActive }) => `${styles.items} ${isActive ? styles.active : ''}`}
                    >Clients</NavLink>
                    <NavLink 
                        to="/clinicians" 
                        className={({ isActive }) => `${styles.items} ${isActive ? styles.active : ''}`}
                    >Clinicians</NavLink>
                    <NavLink 
                        to="/template" 
                        className={({ isActive }) => `${styles.items} ${isActive ? styles.active : ''}`}
                    >Template</NavLink>
                    <NavLink 
                        to="/earn" 
                        className={({ isActive }) => `${styles.items} ${isActive ? styles.active : ''}`}
                    >Earn $80</NavLink>
                </div>

                <div className={styles.rightSide}>
                    <div className={styles.firstBox}>
                        <div className={styles.rightImageBox}>
                            <img src={noteIcon} alt="note" />
                        </div>
                        <p>12 notes left</p>
                        <div className={styles.rightImageBox}>
                            <img src={infoIcon} alt="info" />
                        </div>
                    </div>

                    <button className={styles.superBTN}>Become SUPER</button>

                    <div className={styles.profile}>
                        <p>M</p>
                        <div className={styles.rightImageBox}>
                            <img src={downIcon} alt="arrow" />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar