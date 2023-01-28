import React from 'react'
import cl from './MyModal.module.css'

function MyModal({children,visable,setVisable}) {
   const rootClases = [cl.myModal]
   if(visable) {
      rootClases.push(cl.active)
   }

  return (
    <div className={rootClases.join(' ')} onClick={() => setVisable(false) }>
      <div className={cl.myModalContent} onClick={(ev) => ev.stopPropagation()}>
         {children}
      </div>
    </div>
  )
}

export default MyModal
