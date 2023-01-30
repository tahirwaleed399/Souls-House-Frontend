import classNames from 'classnames';
import React from 'react'
import {card} from './Card.module.css';

 interface props {
children : JSX.Element
 }

const Card = ({children} : props) => {
  return (
   <section className={classNames(card , 'center-me')}>
{children}
   </section>
  )
}

export default Card