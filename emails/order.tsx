import {
   Html,
   Head,
   Font,
   Preview,
   Heading,
   Row,
   Section,
   Text,
   Button,
} from "@react-email/components";

interface orderMailInterface {
   userName: string;
   dressName: string;
}

export default function OrderMail({ userName, dressName }: orderMailInterface) {
   return (
      <Html lang="en" dir="ltr">
         <Head>
            <title>Your order have been placed</title>
            <Font
               fontFamily="Roboto"
               fallbackFontFamily="Verdana"
               webFont={{
                  url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
                  format: "woff2",
               }}
               fontWeight={400}
               fontStyle="normal"
            />
         </Head>
         <Preview>Here&apos;s your orders : {dressName}</Preview>
         <Section>
            <Row>
               <Heading as="h2">Hello {userName},</Heading>
            </Row>
            <Row>
               <Heading as="h5">Your orders: {dressName},</Heading>
            </Row>
            <Row>
               <Text>
                  Thank you for shopping with us.. Your order has been placed
                  and will be delevered to you shortly.
               </Text>
            </Row>
            <Row>
               <Text>Have a good day.</Text>
            </Row>
         </Section>
      </Html>
   );
}
