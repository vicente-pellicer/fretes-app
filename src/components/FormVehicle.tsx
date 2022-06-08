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
  Text
} from "@chakra-ui/react";
import { postVehicle, putVehicle } from "../services/api";
import { useState, useEffect } from "react";

interface FormVehicleProps {
  isOpen: boolean;
  onClose: (update?: boolean) => void;
  isEdit?: boolean;
  _id?: string;
  _name?: string;
  _description?: string;
  _licensePlate?: string;
  _manufacturingYear?: string;
}

export function FormVehicle({
  isOpen,
  onClose,
  isEdit,
  _id,
  _name,
  _description,
  _licensePlate,
  _manufacturingYear
}: FormVehicleProps) {
  // input states
  const [id] = useState(_id ?? "");
  const [name, setName] = useState(_name ?? "");
  const [description, setDescription] = useState(_description ?? "");
  const [licensePlate, setLicensePlate] = useState(_licensePlate ?? "");
  const [manufacturingYear, setManufacturingYear] = useState(
    _manufacturingYear ?? ""
  );

  async function submitVehicle(vehicleId?) {
    if (isEdit === false) {
      let newVehicle = {
        name: name,
        description: description,
        licensePlate: licensePlate,
        manufacturingYear: manufacturingYear
      };
      let data = await postVehicle(newVehicle);
      if (data.status === 200) {
        alert("Sucesso! Veículo registrado.");
      } else {
        let errormsg = data.response.data.error;
        alert("Erro! " + errormsg);
      }
    } else {
      let upVehicle = {
        name: name,
        description: description,
        licensePlate: licensePlate,
        manufacturingYear: manufacturingYear
      };
      let data = await putVehicle(vehicleId, upVehicle);
      if (data.status === 200) {
        alert("Sucesso! Veículo atualizado.");
      } else {
        let errormsg = data.response.data.error;
        alert("Erro! " + errormsg);
      }
    }
  }

  useEffect(() => {
    console.clear();
    console.log("__id:", id);
    console.log("name:", name);
    console.log("desc:", description);
    console.log("plat:", licensePlate);
    console.log("year:", manufacturingYear);
    console.log("edit:", isEdit);
  }, [isEdit, id, name, description, licensePlate, manufacturingYear]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily="mono">
            {isEdit ? "Editar" : "Novo"} Veículo
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody fontFamily="mono">
            <Text mt={4} mb={1}>
              Nome
            </Text>
            <Input
              size="sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Text mt={4} mb={1}>
              Descrição
            </Text>
            <Input
              size="sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Text mt={4} mb={1}>
              Placa
            </Text>
            <Input
              size="sm"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
            />
            <Text mt={4} mb={1}>
              Ano
            </Text>
            <Input
              size="sm"
              value={manufacturingYear}
              onChange={(e) => setManufacturingYear(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                submitVehicle(id);
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
