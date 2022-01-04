import React, { useState } from 'react'
import { Modal, ModalHeader } from 'reactstrap'

class ModalUploadBUkti extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            open : true
         }
    }
    render() { 
        return ( 
            <div>
                <Modal isOpen={this.state.open} toggle={() => this.setState({open: false})}>
                    <ModalHeader toggle={() => this.setState({open: false})}>
                        upload bukti
                    </ModalHeader>
                </Modal>
            </div>
         );
    }
}
 
export default ModalUploadBUkti;
