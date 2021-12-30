import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, FormGroup, Input, InputGroup, Label } from 'reactstrap'
import { addResepAction } from '../action'

const TambahResepPage = () => {

    const [bahan, setBahan] = useState([""])
    const [itemBahan, setItemBahan] = useState("")
    const [instruksi, setInstruksi] = useState([{no: null, langkah: "", photo: ""}])
    const [resep, setResep] = useState({judul: "", deskripsi: "", kategori: "", porsi: "", kesulitan: "", lama: "",bahan: [],instruksi: [] ,photo: "" ,content: "" })
    const [pindah, setpindah] = useState(false)
    const dispatch = useDispatch()

    const onBtAddBahan = () => {

        let temp = [...bahan];

        temp.push("")

        setBahan(temp)
    }

    const onBtAddLangkah = () => {

        let temp = [...instruksi]
        temp.push({no: null, langkah: "", photo: ""})

        setInstruksi(temp)
    }

    const printBahan = () => {
       

        if (bahan.length > 0) {
            return bahan.map((item,index) => {
                return (
                    <Input className='my-2' placeholder='2 siung bawang merah'
                    onChange={(event) => handleBahan(event,index)}/>
                )
            })
        }

    }

    const printLangkah = () => {

        if (instruksi.length > 0 ) {
            return instruksi.map((item,index) => {
                return(
                    <div className="p-3 my-3" style={{ borderRadius: "20px", backgroundColor: "#ced6e0"  }}>
                        <FormGroup>
                            <Input className='my-2' placeholder='Rajang bawang merah'
                            onChange={(event) => handleLangkah(event,index)}/>
                            <Input className='my-2' placeholder='Photo' 
                            onChange={(event) => handleLangkahPhoto(event,index)}/>
                        </FormGroup>
                    </div>
                )
            })
        }
    }

    
    const handleBahan = (event,index) => {
        let temp = [...bahan]
        temp[index] = event.target.value
        setBahan(temp)
    }

    const handleLangkah = (event,index) => {
        let temp = [...instruksi]
        temp[index].langkah = event.target.value
        temp[index].no = index+1
        setInstruksi(temp)
    }

    const handleLangkahPhoto = (event,index) => {
        let temp = [...instruksi]
        temp[index].photo = event.target.value

        setInstruksi(temp)
    }


    const onBtSimpan = async () => {

        let data = {
            ...resep,
            bahan: bahan,
            instruksi: instruksi
        }
        
        try {
            let res = await dispatch(addResepAction(data))

            if(res.success) {
                toast.success(`Data Berhasil Ditambah!`, {
                    position: "top-right",
                    autoClose: 5000
                    });
                setBahan([""])
                setInstruksi([{no: null, langkah: "", photo: ""}])
                setResep({judul: "", deskripsi: "", kategori: "", porsi: "", kesulitan: "", lama: "",bahan: [],instruksi: [] ,photo: "" ,content: "" })
                setTimeout(() => {
                    setpindah(true)
                },500)  
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div>
            {      
                pindah == true && <Navigate  to="/resep-management"/>   
                
            }
            <h1 className="text-center poppins my-3">Bagikan Resep Asik</h1>
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2 mb-3" style={{  borderRadius: "20px", backgroundColor: "#d2dae2"  }}>
                        <div className="col-10 offset-1 p-3 my-3" style={{ borderRadius: "20px", backgroundColor: "#f5f6fa"  }}>
                            <FormGroup>
                                <Label>Judul Resep</Label>
                                <Input placeholder='Judul resep' value={resep.judul}
                                 onChange={(text) => setResep({...resep, judul: text.target.value})}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Deskripsi Resep</Label>
                                <Input placeholder='Deskripsi resep' type='textarea' style={{ height: "20vh" }}
                                value={resep.deskripsi}
                                 onChange={(text) => setResep({...resep, deskripsi: text.target.value})}/>
                            </FormGroup>
                            <InputGroup className='d-flex justify-content-between'>
                                <FormGroup>
                                    <Label>Porsi Resep</Label>
                                    <Input placeholder='2 orang' value={resep.porsi}
                                     onChange={(text) => setResep({...resep, porsi: text.target.value})}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Lama Memasak</Label>
                                    <Input placeholder='1 jam 30 menit' value={resep.lama}
                                     onChange={(text) => setResep({...resep, lama: text.target.value})}/>
                                </FormGroup>
                            </InputGroup>
                            <FormGroup>
                                <Label>Kategori Resep</Label>
                                <Input placeholder='Dessert' value={resep.kategori}
                                 onChange={(text) => setResep({...resep, kategori: text.target.value})}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Tingkat Kesulitan</Label>
                                <Input placeholder='Mudah' value={resep.kesulitan}
                                 onChange={(text) => setResep({...resep, kesulitan: text.target.value})}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Photo Banner</Label>
                                <Input placeholder='photo' value={resep.photo}
                                onChange={(text) => setResep({...resep, photo: text.target.value})}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Tipe Konten</Label>
                                <Input type='select' onChange={(text) => setResep({...resep, content: text.target.value})}>
                                    <option value="Gratis" selected>Gratis</option>
                                    <option value="Premium">Premium</option>
                                </Input>
                            </FormGroup>
                        </div>
                        <div className="col-10 offset-1 p-3 my-3" style={{ borderRadius: "20px", backgroundColor: "#f5f6fa"  }}>
                            <h3 className='poppsin'>Bahan-Bahan</h3>
                            <div className="p-3 my-3" style={{ borderRadius: "20px", backgroundColor: "#ced6e0"  }}>
                                <FormGroup>      
                                         {printBahan()}
                                </FormGroup>
                                <div className='d-flex justify-content-end'>
                                    <Button role={"button"} size='sm' color='primary' onClick={onBtAddBahan}>+ bahan</Button>
                                </div>
                            </div>
                        </div>
                        <div className="col-10 offset-1 p-3 my-3" style={{ borderRadius: "20px", backgroundColor: "#f5f6fa"  }}>
                            <h3 className='poppsin'>Langkah</h3>
                            {printLangkah()}
                            <div className='d-flex justify-content-end m-3'>
                                <Button role={"button"} size='sm' color='primary' onClick={onBtAddLangkah}>+ Langkah</Button>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end m-3'>
                            <Button color='success' block={true} onClick={onBtSimpan}>Terbitkan</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TambahResepPage
