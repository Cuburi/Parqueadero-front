import axios from "axios";

export class VehiculoService{
    baseUrl = "http://localhost:8080/api/v1/";
    getAll() {
        return axios.get(this.baseUrl+"all").then(res => res.data);
    }


    save(vehiculo){
        return axios.post(this.baseUrl+"save", vehiculo).then(res => res.data);
    }
    
    search(placa) {
        return axios.get(this.baseUrl+"findpl/"+placa).then(res => res.data);
    }
    delete(id){
       return axios.get(this.baseUrl+"delete/"+id).then(res => res.data);
     }
}