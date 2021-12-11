import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  Spacer,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { FaListAlt } from "react-icons/fa";
import useSWR from "swr";
import { request } from "../utils/request";

const Index = () => {
  const [isLessThanMd] = useMediaQuery("(max-width: 550px)");
  const { data, error } = useSWR(
    {
      method: "GET",
      url: process.env.NEXT_PUBLIC_API_URL + "/index",
      data: {},
    },
    request.fetcher
  );

  return (
    <Box width="100%" direction="column">
      <Head>
        <title>DPMPTSP Sulawesi Tengah</title>
      </Head>
      <Box bgColor="gray.200" width="100%" p={2}>
        <Flex width="100%" maxWidth="8xl" justify="right">
          <NextLink href="/login">
            <Link
              fontSize="sm"
              fontWeight="bold"
              color="gray.600"
              _hover={{ textDecoration: "none", color: "red.600" }}
            >
              <Button bgColor="transparent">Login</Button>
            </Link>
          </NextLink>
        </Flex>
      </Box>
      <Box
        width="100%"
        bgColor="white"
        elevation={5}
        boxShadow="base"
        py={5}
        px={2}
      >
        <Flex width="100%" height="100%" maxWidth="8xl" align="center">
          <Flex align="center" maxWidth="50px" mx={4}>
            <Image
              src="/logo-fit.png"
              alt="Logo Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu Sulawesi Tengah"
            ></Image>
          </Flex>
          <Box overflow="hidden">
            <Text fontSize="xs">Pemerintah Provinsi Sulawesi Tengah</Text>
            <Heading fontWeight="semibold" fontSize="xl">
              {isLessThanMd
                ? "DPMPTSP Sulawesi Tengah"
                : "Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu Sulawesi Tengah"}
            </Heading>
          </Box>
        </Flex>
      </Box>
      <Box
        elevation={10}
        width="100%"
        bgColor="gray.200"
        height="200px"
        objectFit="cover"
        backgroundImage="dpmptsp.png"
        backgroundSize="cover"
        backgroundPosition="center"
        boxShadow="inner"
      ></Box>
      <Flex width="100%" py={2} px={3} mt={2} spacing={2}>
        <Flex
          width={{ base: "100%", lg: "30%" }}
          height="100px"
          bgColor="red.700"
          rounded="md"
          py={5}
          px={6}
          align="center"
        >
          <Heading fontSize="2xl" color="white">
            Jumlah Izin {data && !error ? data.totalIzin : "0"}
          </Heading>
          <Spacer></Spacer>
          <Box>
            <Icon fontSize="6xl" color="white" as={FaListAlt}></Icon>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Index;
