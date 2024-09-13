import { createBrowserRouter, useLocation } from 'react-router-dom';
import {
  AccountDeactivePage,
  BiddingDashboardPage,
  CorporateAboutPage,
  CorporateContactPage,
  CorporateFaqPage,
  CorporateLicensePage,
  CorporatePricingPage,
  CorporateTeamPage,
  DefaultDashboardPage,
  EcommerceDashboardPage,
  Error400Page,
  Error403Page,
  Error404Page,
  Error500Page,
  Error503Page,
  ErrorPage,
  MarketingDashboardPage,
  PasswordResetPage,
  ProjectsDashboardPage,
  SignInPage,
  SignUpPage,
  SitemapPage,
  SocialDashboardPage,
  UserProfileActionsPage,
  UserProfileActivityPage,
  UserProfileDetailsPage,
  UserProfileFeedbackPage,
  UserProfileHelpPage,
  UserProfileInformationPage,
  UserProfilePreferencesPage,
  UserProfileSecurityPage,
  VerifyEmailPage,
  WelcomePage,
  LearningDashboardPage,
  LogisticsDashboardPage,
  UsersDashboardPage,
  TelegramUsersDashboardPage,
  ErrorNotAuth,
  ProductDeteil,
} from '../pages';
import {
  CorporateLayout,
  DashboardLayout,
  UserAccountLayout,
} from '../layouts';
import React, { ReactNode, useEffect } from 'react';
import { AboutPage } from '../pages/About.tsx';
import { MapPage } from '../pages/dashboards/MapPage.tsx';
import { BilingDeteilPage } from '../pages/dashboards/BilingDeteil.tsx';
import Protected from '../layouts/Protected/Protected.tsx';
import { CreateBiling } from '../pages/dashboards/CreateBiling.tsx';
import MainPage from '../pages/CMS/MainPage.tsx';

// Custom scroll restoration function
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    }); // Scroll to the top when the location changes
  }, [pathname]);

  return null; // This component doesn't render anything
};

type PageProps = {
  children: ReactNode;
};

// Create an HOC to wrap your route components with ScrollToTop
const PageWrapper = ({ children }: PageProps) => {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
};

// Create the router
const router = createBrowserRouter([
  {
    path: '/',
    element: <PageWrapper children={<Protected fallback={<ErrorNotAuth />}><DashboardLayout /></Protected>} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <ProjectsDashboardPage />,
      },
    ],
  },
  {
    path: 'content',
    element: <PageWrapper children={<Protected fallback={<ErrorNotAuth />}><DashboardLayout /></Protected>} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: 'mainpage',
        element: <MainPage />,
      },
    ]
  },
  {
    path: '/dashboards',
    element: <PageWrapper children={<Protected fallback={<ErrorNotAuth />}><DashboardLayout /></Protected>} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: 'category',
        element: <DefaultDashboardPage />,
      },
      {
        path: 'main',
        element: <ProjectsDashboardPage />,
      },
      {
        path: 'biling',
        element: <EcommerceDashboardPage />,
      },
      {
        path: 'revues',
        element: <MarketingDashboardPage />,
      },
      {
        path: 'promo',
        element: <SocialDashboardPage />,
      },
      {
        path: 'products',
        element: <BiddingDashboardPage />,
      },
      {
        path: 'faq',
        element: <LearningDashboardPage />,
      },
      {
        path: 'tables',
        element: <LogisticsDashboardPage />,
      },
      {
        path: 'users',
        element: <UsersDashboardPage />,
      },
      {
        path: 'telegramusers',
        element: <TelegramUsersDashboardPage />,
      },
      {
        path: 'tusks',
        element: <TelegramUsersDashboardPage />,
      },
      {
        path: "map",
        element: <MapPage />
      },
      {
        path: "biling/:id",
        element: <BilingDeteilPage />
      },
      {
        path: 'product/:id',
        element: <ProductDeteil />
      },
      {
        path: 'createbiling',
        element: <CreateBiling />
      }
    ],
  },
  {
    path: '/sitemap',
    element: <PageWrapper children={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: '',
        element: <SitemapPage />,
      },
    ],
  },
  {
    path: '/corporate',
    element: <PageWrapper children={<CorporateLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: 'about',
        element: <CorporateAboutPage />,
      },
      {
        path: 'team',
        element: <CorporateTeamPage />,
      },
      {
        path: 'faqs',
        element: <CorporateFaqPage />,
      },
      {
        path: 'contact',
        element: <CorporateContactPage />,
      },
      {
        path: 'pricing',
        element: <CorporatePricingPage />,
      },
      {
        path: 'license',
        element: <CorporateLicensePage />,
      },
    ],
  },
  {
    path: '/user-profile',
    element: <PageWrapper children={<UserAccountLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: 'details',
        element: <UserProfileDetailsPage />,
      },
      {
        path: 'preferences',
        element: <UserProfilePreferencesPage />,
      },
      {
        path: 'information',
        element: <UserProfileInformationPage />,
      },
      {
        path: 'security',
        element: <UserProfileSecurityPage />,
      },
      {
        path: 'activity',
        element: <UserProfileActivityPage />,
      },
      {
        path: 'actions',
        element: <UserProfileActionsPage />,
      },
      {
        path: 'help',
        element: <UserProfileHelpPage />,
      },
      {
        path: 'feedback',
        element: <UserProfileFeedbackPage />,
      },
    ],
  },
  {
    path: '/auth',
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: 'signin',
        element: <SignInPage />,
      },
      {
        path: 'welcome',
        element: <WelcomePage />,
      },
      {
        path: 'verify-email',
        element: <VerifyEmailPage />,
      },
      {
        path: 'password-reset',
        element: <PasswordResetPage />,
      },
      {
        path: 'account-delete',
        element: <AccountDeactivePage />,
      },
    ],
  },
  {
    path: 'errors',
    errorElement: <ErrorPage />,
    children: [
      {
        path: '400',
        element: <Error400Page />,
      },
      {
        path: '403',
        element: <Error403Page />,
      },
      {
        path: '404',
        element: <Error404Page />,
      },
      {
        path: '500',
        element: <Error500Page />,
      },
      {
        path: '503',
        element: <Error503Page />,
      },
    ],
  },
  {
    path: '/about',
    element: <PageWrapper children={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: '',
        element: <AboutPage />,
      },
    ],
  },
]);

export default router;
