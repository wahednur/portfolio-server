export interface IPortfolio {
  id?: string;
  title: string;
  content?: string;
  thumbnail?: string;
  isFeatured?: boolean;
  tags?: string[];
  views?: number;
  authorId?: string;
}

// model Post {
//   id         String   @id @default(cuid())
//   title      String
//   content    String
//   thumbnail  String
//   isFeatured Boolean  @default(false)
//   tags       String[]
//   views      Int      @default(0)
//   authorId   String
//   author     User     @relation(fields: [authorId], references: [id])
//   createdAt  DateTime @default(now())
//   updatedAt  DateTime @updatedAt
// }
