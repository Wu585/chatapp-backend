import { HttpService } from "@nestjs/axios";
import { PrismaService } from "../prisma.service";

const http = new HttpService();

const prisma = new PrismaService();

const seed = async () => {
  const res1 = await http.axiosRef.get("http://36.152.38.220:8060/Api/role/queryAll");
  console.log(res1.data.data[0]);
  const res2 = await http.axiosRef.get("http://36.152.38.220:8060/Api/roleDesc/queryAll");
  console.log(res2.data.data[0]);

  const res3 = res1.data.data.map(role => {
    const roleDesc = res2.data.data.find(item => item.roleId === role.id);
    return {
      ...role,
      iconUrl: roleDesc ? roleDesc.image : ""
    };
  });
  console.log(res3[0]);
  const res4 = res3.map(item => ({
    title: item.roleName,
    iconUrl: item.iconUrl,
    remark: item.roleMessage
  }));

  prisma.actor.createMany({
    data: res4
  }).then(() => {
    console.log("success");
  }).catch(error => {
    console.log(error);
  });
};

seed();
