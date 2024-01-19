import {Injectable} from '@nestjs/common';
import AlipaySdk from "alipay-sdk";
import * as process from "process";
import AliPayForm from "alipay-sdk/lib/form";

@Injectable()
export class AlipayService {
  alipay: AlipaySdk

  constructor() {
    this.alipay = new AlipaySdk({
      appId: "2021004131652401",
      signType: "RSA2",
      gateway: "https://openapi.alipay.com/gateway.do",
      alipayPublicKey: process.env.AlipayPublicKey,
      privateKey: process.env.PrivateKey
    })
  }

  create(dto) {
    const {orderId} = dto
    // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
    const formData = new AliPayForm();
    formData.setMethod("get")
    formData.addField("notifyUrl", "https://www.xuexiluxian.cn")
    formData.addField("bizContent", {
      outTradeNo: orderId,
    })

    const result = this.alipay.exec("alipay.trade.page.pay", {}, {formData})
    return result.then((resp) => {
      console.log(resp);
      return resp
    })
  }
}
