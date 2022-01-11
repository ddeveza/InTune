import { Backdrop, Modal } from '@material-ui/core'
import React from 'react'
import './ChildPage.css'

const ChildPage = ({toggle, handleToggle}) => {
    return (
        <Modal
        className='modal'
        open={toggle}
        onClose={handleToggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop={true}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
         <div className="child__container">
            I am Child Page
         </div>
      </Modal>
    )
}

export default ChildPage
