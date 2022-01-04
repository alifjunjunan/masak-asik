import React, { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Button,FormGroup,Input,Label,Modal,ModalBody,ModalFooter,ModalHeader } from 'reactstrap'
import { getUserTransaction, updateSubscribe, updateTransaction, updateUserTransaction } from '../action'

const ManagementTransactionPage = () => {

    const {listTransaction,iduser,subscribe} = useSelector((state) => {
        return {
            listTransaction: state.userTransactionReducer.listTransaction,
            subscribe: state.userReducer.subscribe
        }
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserTransaction())
    },[])

    const [modalOpen,setModalOpen] = useState({open: false, idx: 0})

    const onBtKonfir = async (idx) => {

        let temp = [...listTransaction]
        temp[idx].status = "Terkonfirmasi"

        let tempsubs = [...subscribe]

        tempsubs.push(temp[idx])

        try {
            let UserTransaction = await dispatch(updateTransaction([],temp[idx].iduser))
            let userSubscribe = await dispatch(updateSubscribe(tempsubs,temp[idx].iduser))
            let transactionManagement = await dispatch(updateUserTransaction(temp[idx],temp[idx].id))

            if (userSubscribe.success && UserTransaction.success && transactionManagement.success) {
                toast.success("Berhasil terkonfirmasi")
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    const alertConfirm = (idx) => {

        confirmAlert({
            message: "Anda Yakin Mengkonfirmasi Transaksi ini?",
            buttons: [
                {
                    label: "Ya",
                    onClick: () => onBtKonfir(idx)
                },
                {
                    label: "Tidak"
                }
            ]
        })

    }

    const printTransaction = () => {

        return listTransaction.map((item,index) => {
            let {paket,durasi,harga} = item.detail[0]
            return (
                <div>
                    <div className="row mt-3">
                    <div className="col-12 d-flex flex-row" style={{ border: "2px solid white",borderTopRightRadius: "10px", borderTopLeftRadius: "10px", backgroundColor: "#f1f2f6" }}>
                        <div className="col-3" style={{ borderRight: "3px solid white" }}>
                            <div className="p-2">
                                <h6 className="poppins">No.Tagihan:</h6>
                                <h5 className="poppins">{item.invoice}</h5>
                                <p className='poppins m-0'>{item.date}</p>
                            </div>
                        </div>
                        <div className="col-2" style={{ borderRight: "3px solid white" }}>
                            <div className="p-2">
                                <h6 className="poppins">Username:</h6>
                                <h6 className="poppins">{item.username}</h6>
                            </div>
                        </div>
                        <div className="col-2" style={{ borderRight: "3px solid white" }}>
                            <div className="p-2">
                                <h6 className="poppins">Total Pembayaran:</h6>
                                <h5 className="poppins">Rp.{item.totalPayment.toLocaleString()}</h5>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="p-2">
                                <h6 className="poppins">Status Tagihan:</h6>
                                <h5 className="poppins">{item.status}</h5>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex flex-row"  style={{ border: "2px solid white", borderTop: "none", backgroundColor: "#f1f2f6"}}>
                            <div className="col-2">
                                <div className="p-2">
                                    <h6 className="poppins">Paket:</h6>
                                    <h5 className="poppins">{paket}</h5>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="p-2">
                                    <h6 className="poppins">Durasi:</h6>
                                    <h5 className="poppins">{durasi}</h5>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="p-2">
                                    <h6 className="poppins">Harga:</h6>
                                    <h5 className="poppins">Rp.{harga.toLocaleString()}</h5>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="p-2">
                                    <h6 className="poppins">Expired:</h6>
                                    <h5 className="poppins">{item.expired}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12 d-flex justify-content-end" style={{ border: "2px solid white", borderTop: "none", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px", backgroundColor: "#f1f2f6"}}>
                            <div className="col-3 p-3">
                                <Button color='info' className='poppins' style={{ color: "white" }} onClick={() => setModalOpen({...modalOpen, open: true, idx: index})} disabled={item.status == "Terkonfirmasi" && true}>Lihat Bukti Transfer</Button>
                            </div>
                            <div className="col-2 p-3">
                                <Button color='primary' className='poppins' style={{ color: "white" }} onClick={() => alertConfirm(index)} disabled={item.status == "Terkonfirmasi" && true}>Konfirmasi </Button>
                            </div>
                            
                            <Modal isOpen={modalOpen.open} toggle={() => setModalOpen({...modalOpen,open: false})}>
                                <ModalHeader  toggle={() => setModalOpen({...modalOpen,open: false})}>
                                    Lihat Bukti Transfer
                                </ModalHeader>
                                <ModalBody>
                                    <p className="poppins text-center">Bukti Transfer</p>
                                    <div className="row">
                                        <div className="col-8 offset-2">
                                            <img src={listTransaction[modalOpen.idx].buktiTransaksi} alt="" width={"100%"} />
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color='success' onClick={() => setModalOpen({...modalOpen,open: false})}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                    </div>
                </div>
            )
        })
    }
    
    return (
        <div>
            <h1 className="text-center poppins my-3">Management Transaksi</h1>
            <div className="container">
                <hr style={{ height: "0.5vh" }}/>
               {printTransaction()}
            </div>
        </div>
    )
}

export default ManagementTransactionPage
