import Resources from "@domain/entities/resources"

export default interface Banner extends Resources {
  title: string | null;
  description: string | null;
  status: string | null;
  type: string | null;
  videourl: string | null;
  order: string | null;
  banner: any; // FIXME: this should be file Object type
}
