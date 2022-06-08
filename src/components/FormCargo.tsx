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
import { postCargo, putCargo, getAllShipping } from "../services/api";
import { useState, useEffect } from "react";

interface FormCargoProps {
  isOpen: boolean;
  onClose: (update?: boolean) => void;
  isEdit?: boolean;
  _id?: string;
  _name?: string;
  _desc?: string;
  _shipping?: string;
  _cep?: string;
}

export function FormCargo({
  isOpen,
  onClose,
  isEdit,
  _id,
  _name,
  _desc,
  _shipping,
  _cep
}: FormCargoProps) {
  const [shippings, setShippings] = useState([]);

  // input states
  const [id] = useState(_id ?? "");
  const [name, setName] = useState(_name ?? "");
  const [desc, setDesc] = useState(_desc ?? "");
  const [shipping, setShipping] = useState(_shipping ?? "");
  const [cep, setCep] = useState(_cep ?? "");

  async function getShippings() {
    let data = await getAllShipping();
    setShippings(data.all);
  }

  async function submitCargo(cargoId?) {
    if (isEdit === false) {
      let newCargo = {
        name: name,
        description: desc,
        shipping: shipping,
        recipientCep: cep
      };
      let data = await postCargo(newCargo);
      if (data.status === 200) {
        alert("Sucesso! Carga cadastrada.");
      } else {
        let errormsg = data.response.data.error;
        alert("Erro! " + errormsg);
      }
    } else {
      let upCargo = {
        name: name,
        description: desc,
        shipping: shipping,
        recipientCep: cep
      };
      let data = await putCargo(cargoId, upCargo);
      if (data.status === 200) {
        alert("Sucesso! Carga atualizada.");
      } else {
        let errormsg = data.response.data.error;
        alert("Erro! " + errormsg);
      }
    }
  }

  useEffect(() => {
    getShippings();
    console.clear();
    console.log("__id:", id);
    console.log("name:", name);
    console.log("desc:", desc);
    console.log("ship:", shipping);
    console.log("cep.:", cep);
    console.log("edit:", isEdit);
  }, [isEdit, id, name, desc, shipping, cep]);

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
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            <Text mt={4} mb={1}>
              Entrega
            </Text>
            <Select
              size="sm"
              placeholder="Selecionar Entrega"
              value={shipping}
              onChange={(e) => setShipping(e.target.value)}
            >
              {shippings.map((shipping) => (
                <option key={shipping._id} value={shipping._id}>
                  {shipping._id}
                </option>
              ))}
            </Select>
            <Text mt={4} mb={1}>
              CEP
            </Text>
            <Input
              size="sm"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                submitCargo(id);
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
