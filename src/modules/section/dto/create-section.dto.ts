export class CreateSectionDto {
  name: string;

  category: string;

  years: string;

  monday: string;

  tuesday: string;

  wednesday: string;

  thursday: string;

  friday: string;

  saturday: string;

  sunday: string;

  adress: string;

  //   @Column({
  //     nullable: true,
  //   })
  adress2: string;

  //   @Column({
  //     nullable: true,
  //   })
  adress3: string;

  mentor: string;

  //   @Column({
  //     nullable: true,
  //   })
  mentor2: string;

  //   @Column({
  //     nullable: true,
  //   })
  mentor3: string;

  description: string;
}
