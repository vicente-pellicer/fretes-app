import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { BsPlusCircle } from "react-icons/bs";

export function ItemAdd() {
  return (
    <>
      <Flex
        width="100%"
        minH="16rem"
        maxH="16rem"
        background="#EEE"
        borderRadius="12px"
        boxShadow="md"
        direction="column"
        justify="center"
        alignSelf="center"
        alignItems="center"
        cursor="pointer"
      >
        <Grid align="center">
          <GridItem>
            <BsPlusCircle size="3rem" color="#AAA" />
          </GridItem>
          <GridItem>
            <Text color="#AAA">Cadastrar</Text>
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
}
