import axios from "axios"
import { setContactLoading, setContacts, setCreateContact, setCreateContactloading, setDeleteContact, setDeleteContactLoading, setError, setUpdateContact, setUpdateContactLoading } from "../slice/contactSlice";
import { toast } from "react-toastify";

export const Create_Contact = (contactt)=>async(dispatch)=>{
    dispatch(setCreateContactloading())
    try {
        const {data} = await axios.post("http://localhost:6600/contact/create",contactt,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        dispatch(setCreateContact(data.contact));
        toast(data.message);
    } catch (error) {
        toast.error(error?.response?.data?.message || error.response?.data?.error)
    } finally {
        dispatch(setCreateContactloading(false))
    }
}

export const fetch_Contacts = ()=>async(dispatch)=>{
    dispatch(setContactLoading())
    try {
        const {data} = await axios.get("http://localhost:6600/contact/contacts",{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setContacts(data.contacts));
    } catch (error) {
        toast.error(error?.response?.data?.message || error.response?.data?.error);
        dispatch(setError(error?.response?.data?.message || error.response?.data?.error))
    }
}

export const Delete_Contact = (id)=>async(dispatch)=>{
    dispatch(setDeleteContactLoading())
    try {
        const {data} = await axios.delete(`http://localhost:6600/contact/delete/${id}`,{
            withCredentials:true
        });
        dispatch(setDeleteContact(data.contact))
        toast(data.message);
    } catch (error) {
        toast.error(error?.response?.data?.message || error.response?.data?.error);
    } finally {
        dispatch(setDeleteContactLoading(false))
    }
}

export const Update_Contact = (id, contactt,close)=>async(dispatch)=>{
    dispatch(setUpdateContactLoading())
    try {
        const {data} = await axios.put(`http://localhost:6600/contact/update/${id}`,contactt,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true
        });
        dispatch(setUpdateContact(data.contact));
        toast(data.message);
        close()
    } catch (error) {
        toast.error(error?.response?.data?.message || error.response?.data?.error);
    } finally {
        dispatch(setUpdateContactLoading(false))
    }
}