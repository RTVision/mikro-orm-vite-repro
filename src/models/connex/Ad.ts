import { Entity, PrimaryKey, Property, Enum } from "@mikro-orm/core";

export enum AdPlacement {
  LEFT,
  RIGHT,
  CENTER,
}

@Entity()
export default class Ad {
  @PrimaryKey({ type: "number" })
  public id!: number;

  @Property({ type: "string", nullable: true })
  public title?: string;

  @Property({ type: "string", nullable: true })
  public url?: string;

  @Property({ type: "string", nullable: true })
  public imgSmall?: string;

  @Property({ type: "string", nullable: true })
  public imgMedium?: string;

  @Property({ type: "string", nullable: true })
  public imgLarge?: string;

  @Property({ type: "boolean" })
  public active = true;

  @Enum({ type: "AdPlacement" })
  public placement = AdPlacement.LEFT;
}
