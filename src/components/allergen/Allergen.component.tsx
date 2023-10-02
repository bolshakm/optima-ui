import { ABALONE } from '../../assets/svg/allergens/ABALONE';
import { CASHEW } from '../../assets/svg/allergens/CASHEW';
import { CELERY } from '../../assets/svg/allergens/CELERY';
import { CRAB } from '../../assets/svg/allergens/CRAB';
import { EGGS } from '../../assets/svg/allergens/EGGS';
import { FISH } from '../../assets/svg/allergens/FISH';
import { LUPINE } from '../../assets/svg/allergens/LUPINE';
import { MILK } from '../../assets/svg/allergens/MILK';
import { MUSTARD } from '../../assets/svg/allergens/MUSTARD';
import { NUTS } from '../../assets/svg/allergens/NUTS';
import { SDS } from '../../assets/svg/allergens/SDS';
import { SESAME } from '../../assets/svg/allergens/SESAME';
import { SOYBEAN } from '../../assets/svg/allergens/SOYBEAN';
import { SPICY } from '../../assets/svg/allergens/SPICY';
import { VEGETARIAN } from '../../assets/svg/allergens/VEGETARIAN';
import { WHEAT } from '../../assets/svg/allergens/WHEAT';
import { Allergens, DishInfo } from '../../types/allergens.enum';

interface IProps {
  allergen: Allergens | DishInfo;
}

export const Allergen: React.FC<IProps> = ({ allergen }) => {
  switch (allergen) {
    case 'MUSTARD':
      return <MUSTARD />
    case 'CRAB':
      return <CRAB />
    case 'NUTS':
      return <NUTS />
    case 'LUPINE':
      return <LUPINE />
    case 'CASHEW':
      return <CASHEW />
    case 'FISH':
      return <FISH />
    case 'SDS':
      return <SDS />
    case 'EGGS':
      return <EGGS />
    case 'ABALONE':
      return <ABALONE />
    case 'SOYBEAN':
      return <SOYBEAN />
    case 'MILK':
      return <MILK />
    case 'WHEAT':
      return <WHEAT />
    case 'SESAME':
      return <SESAME />
    case 'CELERY':
      return <CELERY />
    case 'SPICY':
      return <SPICY />
    case 'VEGETARIAN':
      return <VEGETARIAN />
    default:
      return <></>;
  }
}