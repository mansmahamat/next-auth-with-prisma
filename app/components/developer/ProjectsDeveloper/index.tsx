import React from "react"
import logoAmazon from "@/images/aws.svg"
import Image from "next/image"
import { Card } from "../../Card"

function ProjectsDeveloper({ article }: any) {
  return (
    <Card as="article">
      <Image
        height={150}
        width={150}
        className="h-36 object-cover w-36 rounded-lg"
        src={
          "https://images.pexels.com/photos/325807/pexels-photo-325807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        alt="avatar"
      />
      <Card.Title href={`/articles/${article.slug}`}>{article.name}</Card.Title>
      <Card.Eyebrow as="time" dateTime={"22/07/93"} decorate>
        22/06/2021
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Project link</Card.Cta>
    </Card>
  )
}

export default ProjectsDeveloper
