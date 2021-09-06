import { Component} from "react";
import "./App.css";
import { VehiculoService } from "./service/VehiculoService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Menubar } from "primereact/menubar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/nova-alt/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
export default class App extends Component {
  constructor() {
    super();
    this.showSuccess = this.showSuccess.bind(this);
    this.state = {
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      vehiculo: {
        id: null,
        placa: "",
        // fechaLlegada: null,
        //horaLlegada: null,
      },
      selectedVehiculo: {

      },
    };
    this.items = [
      {
        label: "Ingreso auto",
        icon: "pi pi-fw pi-plus",
        command: () => {
          this.showSavedDialog();
        },
      },
      {
        label: "Salida auto",
        icon: "pi pi-fw pi-reply",
        command: () => {
          this.showOutDialog();
        },
      },
      {
        label: "Buscar vehiculo",
        icon: "pi pi-fw pi-search",
        command: () => {
          this.showSearchDialog();
        },
      }
    ];

    this.vehiculoService = new VehiculoService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.search = this.search.bind(this);
    this.footer = (
      <div>
        <Button
          label="Confirmar"
          icon="pi pi-check"
          onClick={this.save}
        ></Button>
      </div>
    );
    this.footerOut= (
      <div>
        <Button
          label="Confirmar"
          icon="pi pi-check"
          onClick={this.delete}
        ></Button>
      </div>
    );
    this.footerSearch=(
      <Button
      label="Confirmar"
      icon="pi pi-check"
      onClick={this.search}
    ></Button>
    );
  }

  componentDidMount() {
    this.vehiculoService.getAll().then((data) => {
      this.setState({ vehiculos: data });
    });
  }

  save() {
    this.vehiculoService.save(this.state.vehiculo).then((data) => {
       console.log(data);
      if (data) {
        this.setState({
         
          visible1: false,
          vehiculo: {
            id: null,
            placa: "",
            //fechaLlegada: null,
            //horaLlegada: null,
          },
        });
        this.vehiculoService.getAll().then((data) => {
          this.setState({ vehiculos: data });
        });
        this.showSuccess();
      }else{
        this.setState({
         
          visible1: false
        });
        this.showError();
      }
      
    });
  }

  delete(){
    this.vehiculoService.delete(this.state.selectedVehiculo.id).then(data => {
      this.setState({
        visible2: false,
      })
      this.vehiculoService.getAll().then((data) => {
        this.setState({ vehiculos: data });
      });
      this.showSuccessDelete();
    })
  }
  search(){
    this.vehiculoService.search(this.state.vehiculo.placa).then((data) => {
      console.log(data);
      this.setState({
        visible4: false,
        visible3: true,
        vehiculo: {
          id: data.id,
          placa: data.placa,
          fechaLlegada: data.fechaLlegada,
          horaLlegada: data.horaLlegada,
        },
      })
    })
      
  }
  showSuccess() {
    this.toast.show({severity:'success', summary: 'Ingreso un nuevo vehiculo', life: 3000});
  }
  showSuccessDelete() {
    this.toast.show({severity:'success', summary: 'Vehiculo retirado', life: 3000});
  }
  showError() {
    this.toast.show({severity:'error', summary: 'Parqueadero lleno', life: 3000});
}
  render() {
    return (
      <div style={{ width: "80%", margin: "0 auto", marginTop: "20px" }}>
        <Toast ref={(el) => this.toast = el} />
        <Menubar model={this.items} />
        <br />
        <DataTable
          value={this.state.vehiculos}
          selectionMode="single"
          selection={this.state.selectedVehiculo}
          onSelectionChange={(e) =>
            this.setState({ selectedVehiculo: e.value })
          }
          rows="5"
          paginator={true}
        >
          <Column field="id" header="ID"></Column>
          <Column field="placa" header="Placa"></Column>
          <Column field="fechaLlegada" header="Fecha Llegada"></Column>
          <Column field="horaLlegada" header="Hora Llegada"></Column>
        </DataTable>

        <Dialog
          header="Registro de vehiculo"
          footer={this.footer}
          visible={this.state.visible1}
          style={{ width: "400px" }}
          modal={true}
          onHide={() => this.setState({ visible1: false })}
          id="modalSave"
        >
          <span className="p-float-label">
            <InputText
              value={this.state.vehiculo.placa}
              style={{ width: "100%" }}
              widhvalue={this.state.value}
              id="placa"
              onChange={(e) => {
                let val = e.target.value;
                this.setState((prevState) => {
                  let vehiculo = Object.assign({}, prevState.vehiculo);
                  vehiculo.placa = val;
                  return { vehiculo };
                });
              }}
            />
            <label htmlFor="placa">placa</label>
          </span>

        </Dialog>

        <Dialog
          header="Salida de vehiculo"
          footer={this.footerOut}
          visible={this.state.visible2}
          style={{ width: "400px" }}
          modal={true}
          onHide={() => this.setState({ visible2: false })}
          id="modalOut"
        >
          <br/>
          <span className="p-float-label">
            <InputText
              value={this.state.vehiculo.placa}
              style={{ width: "100%" }}
              widhvalue={this.state.value}
              id="placa"
              onChange={(e) => {
                let val = e.target.value;
                this.setState((prevState) => {
                  let vehiculo = Object.assign({}, prevState.vehiculo);
                  vehiculo.placa = val;
                  return { vehiculo };
                });
              }}
              disabled
            />
            <label htmlFor="placa">placa</label>
          </span>
          <br/>
          <br/>
          <span className="p-float-label">
            <InputText
              value={this.state.vehiculo.fechaLlegada}
              style={{ width: "100%" }}
              widhvalue={this.state.value}
              id="fechaLlegada"
              onChange={(e) => {
                let val = e.target.value;
                this.setState((prevState) => {
                  let vehiculo = Object.assign({}, prevState.vehiculo);
                  vehiculo.fechaLlegada = val;
                  return { vehiculo };
                });
              }}
              disabled
            />
            <label htmlFor="fechaLlegada">Fecha Llegada</label>
          </span>
          <br/>
          <br/>
          <span className="p-float-label">
            <InputText
              value={this.state.vehiculo.horaLlegada}
              style={{ width: "100%" }}
              widhvalue={this.state.value}
              id="horaLlegada"
              onChange={(e) => {
                let val = e.target.value;
                this.setState((prevState) => {
                  let vehiculo = Object.assign({}, prevState.vehiculo);
                  vehiculo.horaLlegada = val;
                  return { vehiculo };
                });
              }}
              disabled
            />
            <label htmlFor="horaLlegada">Hora Llegada</label>
          </span>
          <br/>
          <br/>
          <span className="p-float-label">
            <InputText
              value={this.state.hourOut}
              style={{ width: "100%" }}
              widhvalue={this.state.hourOut}
              id="horaSalida"
              disabled
            />
            <label htmlFor="horaSalida">Fecha Salida</label>
          </span>
          <br/>
          <br/>
          <Card style={{ backgroundColor: "#333333", color: "white"}} id="price" title="Valor a cobrar " subTitle={"$"+this.state.price}>
              
             
          </Card>
          
        </Dialog>


        <Dialog
          header="Vehiculo"
          visible={this.state.visible3}
          style={{ width: "400px" }}
          modal={true}
          onHide={() => this.setState({ visible3: false })}
          id="modalOut"
        >
          <br/>
          <span className="p-float-label">
            <InputText
              value={this.state.vehiculo.placa}
              style={{ width: "100%" }}
              widhvalue={this.state.value}
              id="placa"
              onChange={(e) => {
                let val = e.target.value;
                this.setState((prevState) => {
                  let vehiculo = Object.assign({}, prevState.vehiculo);
                  vehiculo.placa = val;
                  return { vehiculo };
                });
              }}
              disabled
            />
            <label htmlFor="placa">placa</label>
          </span>
          <br/>
          <br/>
          <span className="p-float-label">
            <InputText
              value={this.state.vehiculo.fechaLlegada}
              style={{ width: "100%" }}
              widhvalue={this.state.value}
              id="fechaLlegada"
              onChange={(e) => {
                let val = e.target.value;
                this.setState((prevState) => {
                  let vehiculo = Object.assign({}, prevState.vehiculo);
                  vehiculo.fechaLlegada = val;
                  return { vehiculo };
                });
              }}
              disabled
            />
            <label htmlFor="fechaLlegada">Fecha Llegada</label>
          </span>
          <br/>
          <br/>
          <span className="p-float-label">
            <InputText
              value={this.state.vehiculo.horaLlegada}
              style={{ width: "100%" }}
              widhvalue={this.state.value}
              id="horaLlegada"
              onChange={(e) => {
                let val = e.target.value;
                this.setState((prevState) => {
                  let vehiculo = Object.assign({}, prevState.vehiculo);
                  vehiculo.horaLlegada = val;
                  return { vehiculo };
                });
              }}
              disabled
            />
            <label htmlFor="horaLlegada">Hora Llegada</label>
          </span>
          
        </Dialog>
        
        <Dialog
          header="Buscar vehiculo"
          footer={this.footerSearch}
          visible={this.state.visible4}
          style={{ width: "400px" }}
          modal={true}
          onHide={() => this.setState({ visible4: false })}
          id="modalSearch"
        >
           <span className="p-float-label">
            <InputText
              value={this.state.vehiculo.placa}
              style={{ width: "100%" }}
              widhvalue={this.state.value}
              id="placa-search"
              onChange={(e) => {
                let val = e.target.value;
                this.setState((prevState) => {
                  let vehiculo = Object.assign({}, prevState.vehiculo);
                  vehiculo.placa = val;
                  return { vehiculo };
                });
              }}
            />
            <label htmlFor="placa">placa</label>
          </span>

        </Dialog>

      </div>
    );
  }

  showSavedDialog() {
    this.setState({
      visible1: true,
      vehiculo: {
        id: null,
        placa: "",
        // fechaLlegada: null,
        //horaLlegada: null,
      },
    });
    //oast.current.show({severity: 'success', summary: 'Success Message', detail: 'Order submitted'});
  }

  showOutDialog(){
    let today = new Date()
    let hourOut = today.getHours()+':'+ today.getMinutes()+':'+ today.getSeconds();;
    console.log(hourOut);
    console.log(typeof(hourOut));
    let endMin = parseInt(hourOut.substr(3,2));
    let endHour = parseInt(hourOut.substr(0,2));
    let startMin = parseInt(this.state.selectedVehiculo.horaLlegada.substr(3,2));
    let startHour = parseInt(this.state.selectedVehiculo.horaLlegada.substr(0,2));
    console.log(endMin,endHour,startMin,startHour);
    let min = endMin-startMin;
    let hour = endHour-startHour;
    console.log(min,hour);
    if (min<0) {
      hour--;
      min+=60;
    }
    min+=hour*60;
    let price = min*100
    console.log(min);
    this.setState({
      visible2: true,
      vehiculo: {
        id: this.state.selectedVehiculo.id,
        placa: this.state.selectedVehiculo.placa,
        fechaLlegada: this.state.selectedVehiculo.fechaLlegada,
        horaLlegada: this.state.selectedVehiculo.horaLlegada,
      },
      price,
      hourOut
    })
  
  }

  showSearchDialog(){
    this.setState({
      visible4: true,
      vehiculo: {
        id: null,
        placa: "",
      },
    })
  }
}
