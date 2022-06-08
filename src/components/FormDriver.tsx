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
import { postDriver, putDriver } from "../services/api";
import { useState, useEffect } from "react";

interface FormDriverProps {
  isOpen: boolean;
  onClose: (update?: boolean) => void;
  isEdit?: boolean;
  _id?: string;
  _name?: string;
  _cpf?: string;
  _birthdate?: string;
}

export function FormDriver({
  isOpen,
  onClose,
  isEdit,
  _id,
  _name,
  _cpf,
  _birthdate
}: FormDriverProps) {
  // input states
  const [id] = useState(_id ?? "");
  const [name, setName] = useState(_name ?? "");
  const [cpf, setCpf] = useState(_cpf ?? "");
  const [birthdate, setBirthdate] = useState(_birthdate ?? "");

  async function submitDriver(driverId?) {
    if (isEdit === false) {
      let newDriver = {
        name: name,
        cpf: cpf,
        birthdate: birthdate
      };
      let data = await postDriver(newDriver);
      if (data.status === 200) {
        alert("Sucesso! Motorista registrado.");
      } else {
        let errormsg = data.response.data.error;
        alert("Erro! " + errormsg);
      }
    } else {
      let upDriver = {
        name: name,
        cpf: cpf,
        birthdate: birthdate
      };
      let data = await putDriver(driverId, upDriver);
      if (data.status === 200) {
        alert("Sucesso! Motorista atualizado.");
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
    console.log("cpf.:", cpf);
    console.log("birt:", birthdate);
  }, [isEdit, id, name, cpf, birthdate]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily="mono">
            {isEdit ? "Editar" : "Novo"} Motorista
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
              CPF
            </Text>
            <Input
              size="sm"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <Text mt={4} mb={1}>
              Data de Nascimento
            </Text>
            <Input
              size="sm"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                submitDriver(id);
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
