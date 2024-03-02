import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button'
function Comment() {


  const [comment, setComment] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const isUserDisabled = (status) => status === 'aprroved'
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    title: { value: null, matchMode: FilterMatchMode.CONTAINS },
    price: { value: null, matchMode: FilterMatchMode.EQUALS },
});
const onGlobalFilterChange = (e) => {
  console.log("v", e.target.value);
  const value = e.target.value;
  let _filters = { ...filters };

  _filters['global'].value = value;

  setFilters(_filters);
  setGlobalFilterValue(value);
};



const renderHeader = () => {
  return (
      <div className="flex justify-content-end">
          <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
          </span>
      </div>
  );
};
const header = renderHeader();

  useEffect(() => {
    axios.get('http://localhost:4001/Comment/getall').then((res) => {
      console.log(res.data.comment,"sadad")
 
      setComment(res.data.comment)

    })
  }, []);

  const handleEdit = (id) => {
   
    axios.put(`http://localhost:4001/Comment/update/${id}`,{
      
        status:"aprroved"
       
    }).then((res) => {
      if(res.data.status == true){
        alert("Approve Successfully");
      }else{
        alert(res.data.message)
      }
     }).catch((e)=>{
        alert(e.message)
     })
  }
  const handledelete = (id) => {
    alert(id)
    axios.delete(`http://localhost:4001/Comment/delete/${id}`).then((res) => {
      console.log(res)
      if(res.data.status==true){
        alert("Delete Successfully")
      }else{
        alert(error.message)
      }
    })
  }
  
  const actionBodyTemplate = (comment) => {
    const isDisabled = isUserDisabled(comment.status);
    return (<>
      <div className='flex gap-2'>
        <Button className='text-white py-0' disabled={isDisabled} size="small" onClick={() => handleEdit(comment._id)} >Approved</Button>
        <Button icon="pi pi-times" rounded severity="danger" aria-label="Cancel" size="small"  onClick={() => handledelete(comment._id)}/>
      </div>
    </>
    )
  };
  return (
    <>
    <h1>coments</h1>

    <div className="card">
      <DataTable value={comment} filters={filters} globalFilterFields={['title', 'price']} header={header} showGridlines={true} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '30rem', backgroundColor: '#9ebdfc' }}>
          <Column field="postid" filter  header="Postid" sortable ></Column>
          <Column field="comment" filter header="Comment" sortable></Column>
          <Column field="status" header="Status"></Column>
          <Column field="action" header="Action" body={actionBodyTemplate}></Column>
        </DataTable>
      </div>
    
    </>
  )
}

export default Comment;