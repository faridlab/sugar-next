import Resources from "@domain/entities/resources"

export default interface Content extends Resources {
  title: string | null;
  slug?: string | null;
  content: string | null;
  excerpt?: string | null;
  type?: string | null;
  visibility?: string | null;
  publish_type?: string | null;
  publish_date?: string | null;
}
