export interface Repository 
{
    name: string;
    html_url: string | null;
    homepage: string | null;
    description: string;
    img: string | null;
    topics: string[];
}