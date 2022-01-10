import React, { useState } from 'react'
import { Button, FormGroup, Input, Label } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { addArtikelAction } from '../action'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const TambahArtikelPage = () => {

      const [artikel,setArtikel] = useState({judul: "", deskripsi: "",kategori: "", photo: "",date: ""})
      const [pindah,setPindah] =useState(false)
      const disptach = useDispatch()

      const {kategoriArtikel} = useSelector((state) => {
        return {
            kategoriArtikel: state.kategoriArtikelReducer.listKategoriArtikel
        }
      })

  const onBtSimpan = async () => {

    let time = new Date()
    let tanggal = time.getDate() + "-" + (time.getMonth() + 1) + "-" + time.getFullYear()
    let paket = ["Monthly","Quaterly"]

      let data = {
         ...artikel,
         date: tanggal.toLocaleString(),
         content: "Premium",
         paket
      }

      try {
          let res = await disptach(addArtikelAction(data))

          if (res.success) {
              toast.success('Data Berhasil Ditambah')
              setArtikel({judul: "", deskripsi: "",kategori: "", photo: "",date: ""})
              setTimeout(() => {setPindah(true)},500)
          }
      } catch (error) {
          console.log(error)
      }

    
  }

  const printKategori = () => {

    if(kategoriArtikel.length > 0) {
        return kategoriArtikel.map((item,index) => {
            return(
                <option value={item.kategori}>{item.kategori}</option>
            )
        })
    }
  }

    return (
        <div>
            {
                pindah && <Navigate to={"/artikel-management"}/>
            }
            <h1 className="text-center poppins my-3">Bagikan Artikel Asik</h1>
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2 mb-3" style={{  borderRadius: "20px", backgroundColor: "#d2dae2"  }}>
                        <div className="col-10 offset-1 p-3 my-3" style={{ borderRadius: "20px", backgroundColor: "#f5f6fa"  }}>
                            <FormGroup>
                                <Label>Judul Artikel</Label>
                                <Input placeholder='Judul Artikel' onChange={(text) => setArtikel({...artikel, judul: text.target.value})}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Deskripsi</Label>
                                <Input type='textarea' style={{ height: "80vh" }} onChange={(text) => setArtikel({...artikel, deskripsi: text.target.value})}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Kategori</Label>
                                <Input placeholder='Kategori' type='select' onChange={(text) => setArtikel({...artikel, kategori: text.target.value})}>
                                    <option value="">pilih Kategori</option>
                                    {printKategori()}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Photo Banner</Label>
                                <Input placeholder='Photo' onChange={(text) => setArtikel({...artikel, photo: text.target.value})}/>
                            </FormGroup>
                            <Button color='success' onClick={onBtSimpan}>simpan</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TambahArtikelPage
