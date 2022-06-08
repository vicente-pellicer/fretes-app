import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Text
} from "@chakra-ui/react";
import {
  getAllDriver,
  getAllCargo,
  getAllVehicle,
  postShipping,
  putShipping
} from "../services/api";
import { useState, useEffect } from "react";

interface FormShippingProps {
  isOpen: boolean;
  onClose: (update?: boolean) => void;
  isEdit?: boolean;
  _id?: string;
  _driver?: string;
  _vehicle?: string;
  _cargo?: string;
  _description?: string;
}

export function FormShipping({
  isOpen,
  onClose,
  isEdit,
  _id,
  _driver,
  _vehicle,
  _cargo,
  _description
}: FormShippingProps) {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [cargos, setCargos] = useState([]);

  // input states
  const [id] = useState(_id ?? "");
  const [driver, setDriver] = useState(_driver ?? "");
  const [vehicle, setVehicle] = useState(_vehicle ?? "");
  const [cargo, setCargo] = useState(_cargo ?? "");
  const [description, setDescription] = useState(_description ?? "");

  async function getData() {
    let dataDrivers = await getAllDriver();
    setDrivers(dataDrivers.all);
    let dataVehicles = await getAllVehicle();
    setVehicles(dataVehicles.all);
    let dataCargos = await getAllCargo();
    setCargos(dataCargos.all);
  }

  async function submitShipping(shippingId?) {
    if (isEdit === false) {
      let newShipping = {
        driver: driver,
        vehicle: vehicle,
        cargo: cargo,
        description: description
      };
      let data = await postShipping(newShipping);
      if (data.status === 200) {
        alert("Sucesso! Entrega registrada.");
      } else {
        let errormsg = data.response.data.error;
        alert("Erro! " + errormsg);
      }
    } else {
      let upShipping = {
        driver: driver,
        vehicle: vehicle,
        cargo: cargo,
        description: description
      };
      let data = await putShipping(shippingId, upShipping);
      if (data.status === 200) {
        alert("Sucesso! Entrega atualizada.");
      } else {
        let errormsg = data.response.data.error;
        alert("Erro! " + errormsg);
      }
    }
  }

  useEffect(() => {
    getData();
    console.clear();
    console.log("__id:", id);
    console.log("driv:", driver);
    console.log("vehi:", vehicle);
    console.log("carg:", cargo);
    console.log("desc:", description);
    console.log("edit:", isEdit);
  }, [isEdit, id, driver, vehicle, cargo, description]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily="mono">
            {isEdit ? "Editar" : "Nova"} Carga
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody fontFamily="mono">
            <Text mt={4} mb={1}>
              Motorista
            </Text>
            <Select
              size="sm"
              placeholder="Selecionar Motorista"
              value={driver}
              onChange={(e) => setDriver(e.target.value)}
            >
              {drivers.map((driver) => (
                <option key={driver._id} value={driver._id}>
                  {driver.name}
                </option>
              ))}
            </Select>
            <Text mt={4} mb={1}>
              Veículo
            </Text>
            <Select
              size="sm"
              placeholder="Selecionar Veículo"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
            >
              {vehicles.map((vehicle) => (
                <option key={vehicle._id} value={vehicle._id}>
                  {vehicle.name}
                </option>
              ))}
            </Select>
            <Text mt={4} mb={1}>
              Carga
            </Text>
            <Select
              size="sm"
              placeholder="Selecionar Carga"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
            >
              {cargos.map((cargo) => (
                <option key={cargo._id} value={cargo._id}>
                  {cargo.name}
                </option>
              ))}
            </Select>
            <Text mt={4} mb={1}>
              Descrição
            </Text>
            <Input
              size="sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                submitShipping(id);
                onClose();
              }}
            >
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
