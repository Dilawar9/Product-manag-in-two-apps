import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button';
import { toast } from 'react-toastify';


function Category() {

  const successmsg = () => toast("Category succesfully added ");

  const [category, setcategory] = useState('')
  const navigate = useNavigate()

  const hamdelbtn = () => {
    if (category == '') {
      alert('Please Enter Data')
    } else {
      axios.post('http://localhost:4001/category/creat', {

        category: category
      }
      )
        .then((res) => {
          console.log(res.status)
          if (res.status == 200) {
            successmsg()
            setcategory("")
            setTimeout(() => {
              navigate("/dashboard")
            }, 5000);

          }

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }
  }
  return (
    <div>
      <div className=' border mx-auto py-3 px-7'>
        <form onSubmit={(e) => { e.preventDefault() }}>
          <div className="formgrid grid">
            <div className="field col-12">
              <label >Add Category</label>
              <input id="firstname6" type="text" value={category} onChange={(e) => {
                setcategory(e.target.value)
              }} className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
            </div>
          </div>
        </form>
        <Button label="submit" onClick={hamdelbtn} />
      </div>
    </div>
  )
}
export default Category;