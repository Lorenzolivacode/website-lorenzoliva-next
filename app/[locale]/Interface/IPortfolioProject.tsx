export interface IPortfolioData {
  id: string;
  title: string;
  tecnicalRequirements: string[];
  img: string;
  description: IDescriptionPData;
  linkGithub: string;
  linkProject: string;
  created: string;
}

export interface IDescriptionPData {
  italian: string;
  english: string;
}
