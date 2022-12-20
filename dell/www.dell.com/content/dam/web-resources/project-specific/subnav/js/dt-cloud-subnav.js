// JavaScript Document

///////////////////////////////////////////
//	CONFIG
///////////////////////////////////////////


///////////////////////////////////////////
//	GLOBALS
///////////////////////////////////////////


///////////////////////////////////////////
//	MAIN
///////////////////////////////////////////
/* eslint-disable */
var jsonTest = {
  options: {
    hideNavRoot: false,
    isAnchorNav: false,
    isSticky: true,
    classes: "",
    AEMPath: "/rebellion-workspace/dell-tech-cloud-site/html/"
  },
  navroot: {
    'title': "Cloud",
    'href': 'javascript:void();',
    'target': '',
    'dellMetrics': "{'btnname':'nav|sub|cloud|home'}",
    'submenu': [
      [
        {
          'title': "Impact Main",
          // 'description': "Achieve business agility, reliability and control with Cloud solutions tailored to your organization.",
          'href': 'dell-technologies-cloud/benefits.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|cloud|overview|whychoosedelltechnologiescloud'}"
        },
        {
          'title': "Advancing Sustainability",
          // 'description': "Modernize your data center and apps, unify operations, customize to scale and migrate workloads to any Cloud.",
          "href": 'dell-technologies-cloud/use-cases.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|cloud|overview|cloudusecases'}"
        },
        {
          'title': "Cultivating Inclusion",
          // 'description': "Explore our options to enhance your IT infrastructure with our Dell Technologies On Demand portfolio.",
          'href': 'dell-technologies-cloud/consumption-options.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|cloud|overview|consumptionoptions'}"
        },
        {
          'title': "Transforming Lives",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'dell-technologies-cloud/console.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|cloud|overview|cloudconsole'}"
        },
        {
          'title': "Ethics & Privacy",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'dell-technologies-cloud/console.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|cloud|overview|cloudconsole'}"
        },
        {
          'title': "Our Progress",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'social-impact-esg.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|cloud|overview|cloudconsole'}"
        },
        {
          'title': "ESG Resources",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'dell-technologies-cloud/console.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|cloud|overview|cloudconsole'}",
          'class': 'active'
        }
      ]
    ]
  },
  menu:
  [
    {
      'title': "Home",
      'href': 'index.htm',
      'dellMetrics': "{'btnname':'nav|sub|cloud|index'}",
      'class': 'mobile-only'
    },
    {
      'title': "Overview",
      'href': 'javascript:void();',
      'dellMetrics': "{'btnname':'nav|sub|cloud|overview'}",
      'submenu': [
        [
          {
            'title': "Why Choose Dell Technologies Cloud?",
            'description': "Achieve business agility, reliability and control with Cloud solutions tailored to your organization.",
            'href': 'dell-technologies-cloud/benefits.htm',
            'target': '',
            'dellMetrics': "{'btnname':'nav|sub|cloud|overview|whychoosedelltechnologiescloud'}"
          },
          {
            'title': "Cloud Use Cases",
            'description': "Modernize your data center and apps, unify operations, customize to scale and migrate workloads to any Cloud.",
            "href": 'dell-technologies-cloud/use-cases.htm',
            'target': '',
            'dellMetrics': "{'btnname':'nav|sub|cloud|overview|cloudusecases'}"
          },
          {
            'title': "Consumption Options",
            'description': "Explore our options to enhance your IT infrastructure with our Dell Technologies On Demand portfolio.",
            'href': 'dell-technologies-cloud/consumption-options.htm',
            'target': '',
            'dellMetrics': "{'btnname':'nav|sub|cloud|overview|consumptionoptions'}"
          },
          {
            'title': "Cloud Console",
            'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
            'href': 'dell-technologies-cloud/console.htm',
            'target': '',
            'dellMetrics': "{'btnname':'nav|sub|cloud|overview|cloudconsole'}"
          }
        ]
      ]
    },
    {
      'title': "Platforms",
      'href': 'javascript:void();',
      'target': '_blank',
      'dellMetrics': "{'btnname':'nav|sub|cloud|platforms'}",
      'submenu': [
        [
          {
            'title': "Dell Technologies Cloud Platform",
            'description': "Deploy and manage Cloud native applications with legacy applications on a single platform.",
            'href': 'platforms/dell-technologies-cloud-platform.htm',
            'dellMetrics': "{'btnname':'nav|sub|cloud|platforms|delltechnologiescloudplatform'}",
          },
          {
            'title': "Data Center as-a-Service",
            'description': "Innovate, control growth and simplify your IT infrastructure with our Data Center as-a-Service solution.",
            'href': 'platforms/data-center-as-a-service.htm',
            'dellMetrics': "{'btnname':'nav|sub|cloud|platforms|datacenterasaservice'}",
          },
          {
            'title': "Dell Technologies Tanzu Advantage",
            'description': "Evolve your virtualization approach to include cloud-native technologies with integrated solutions featuring VMware Tanzu.",
            'href': 'platforms/tanzu.htm',
            'dellMetrics': "{'btnname':'nav|sub|cloud|platforms|tanzu'}"
          }
        ]
      ]
    },
    {
      'title': "Cloud Services",
      'href': 'javascript:void();',
      'dellMetrics': "{'btnname':'nav|sub|cloud|cloudservices'}",
      'submenu': [
        [
          {
            'title': "cloud-storage-services",
            'description': "",
            'href': 'cloud-services/storage/cloud-storage-services.htm',
            'class': 'hidden'
          },
          {
            'title': "cloud-storage-solutions-for-unstructured-data",
            'description': "",
            'href': 'cloud-services/storage/cloud-storage-solutions-for-unstructured-data.htm',
            'class': 'hidden'
          },
          {
            'title': "Onefs for Google",
            'description': "",
            'href': 'cloud-services/storage/onefs-for-google-cloud.htm',
            'class': 'hidden'
          },
          {
            'title': "Cloud Storage",
            'description': "Get the benefits of enterprise-grade storage with affordable, scalable and flexible data storage for Cloud.",
            'href': 'cloud-services/storage/index.htm',
            'dellMetrics': "{'btnname':'nav|sub|cloud|cloudservices|cloudstorage'}",
            // 'submenu': [
            //   {
            //     'title': "PowerMax",
            //     'href': 'javascript:void();'
            //   },
            //   {
            //     'title': "Unity",
            //     'href': 'javascript:void();'
            //   }
            // ] 
          },
          {
            'title': "Cloud Data Protection",
            'description': "Reduce risk and maintain control of your data safely for your entire Cloud infrastructure.",
            'href': 'cloud-services/data-protection/index.htm',
            'dellMetrics': "{'btnname':'nav|sub|cloud|cloudservices|clouddataprotection'}",
          }
        ]
      ]
    },
    {
      'title': "Solutions",
      'href': 'javascript:void();',
      'dellMetrics': "{'btnname':'nav|sub|cloud|solutions'}",
      'submenu': [
        [
          {
            'title': "Validated Designs",
            'description': "Improve performance and increase time-to-value with Dell EMC infrastructure and VMware Cloud Foundation.",
            'href': 'solutions/validated-designs.htm',
            'dellMetrics': "{'btnname':'nav|sub|cloud|solutions|validateddesigns'}",
          },
          {
            'title': "Dell EMC Solutions for Microsoft Azure Stack",
            'description': "Invest in modern IT to take advantage of new opportunities, reduce cost and increase uptime.",
            'href': 'solutions/microsoft-azure-stack.htm',
            'dellMetrics': "{'btnname':'nav|sub|cloud|solutions|microsoft-azure-stack'}",
          },
          {
            'title': "Cloud Virtual Desktop Infrastructure (VDI)",
            'description': "Rapidly deploy virtual desktops and centrally manage your hybrid cloud environment.",
            'href': 'solutions/vdi.htm',
            'dellMetrics': "{'btnname':'nav|sub|cloud|solutions|vdi'}",
          }
        ]
      ]
    },
    {
      'title': "Technology Services",
      'href': 'javascript:void();',
      'dellMetrics': "{'btnname':'nav|sub|cloud|technologyservices'}",
      'submenu': [
        [
          {
            'title': "Consulting",
            'description': "Optimize and modernize your applications to reinforce customer value and develop new opportunities.",
            'href': 'technology-services/index.htm#tab0=0',
            'dellMetrics': "{'btnname':'nav|sub|cloud|technologyservices|consulting'}"
          },
          {
            'title': "Managed Services",
            'description': "Deliver fast, consistent and modern Cloud management with our dependable Managed Services team.",
            'href': 'technology-services/index.htm#tab0=1',
            'dellMetrics': "{'btnname':'nav|sub|cloud|technologyservices|managedservices'}"
          },
          {
            'title': "Education",
            'description': "Take our training and certification courses about Cloud infrastructure, operating models and more.",
            'href': 'technology-services/index.htm#tab0=2',
            'dellMetrics': "{'btnname':'nav|sub|cloud|technologyservices|education'}"
          }
        ]
      ]
    },
    {
      'title': "Partners",
      'href': 'javascript:void();',
      'dellMetrics': "{'btnname':'nav|sub|cloud|partners'}",
      'submenu': [
        [
          {
            'title': "System Intergrators",
            'description': "",
            'href': 'partners/partner-clouds/systems-integrators.htm',
            'dellMetrics': "{'btnname':'nav|sub|cloud|partners|systemintergrators'}",
            'class': 'hidden'
          },
          {
            'title': "Partner Overview",
            'description': "Learn how Dell Technologies partners will help you reach your full potential with our Cloud solutions.",
            'href': 'partners/partner-overview.htm',
            'dellMetrics': "{'btnname':'nav|sub|cloud|partners|partneroverview'}",
            // 'submenu': [
            //   {
            //     'title': "VMC on AWS",
            //     'href': 'javascript:void();'
            //   },
            //   {
            //     'title': "Azure VMware Solutions",
            //     'href': 'javascript:void();'
            //   },
            //   {
            //     'title': "Google Cloud Platform",
            //     'href': 'javascript:void();'
            //   }
            // ] 
          },
          {
            'title': "Why Work with a Dell Technologies Cloud Partner?",
            'description': "Maximize your Cloud with our certified partners to secure flexibility, less risk and faster time-to-value.",
            'href': 'partners/find-a-partner.htm',
            'dellMetrics': "{'btnname':'nav|sub|cloud|partners|whyworkwithadelltechnologiescloudpartner'}"
          },
          {
            'title': "Why Become a Dell Technologies Cloud Partner?",
            'description': "Become a Dell Technologies Cloud Partner and elevate your skills to support your customers' Cloud journey.",
            'href': 'partners/become-a-partner.htm',
            'dellMetrics': "{'btnname':'nav|sub|cloud|partners|whybecomeadelltechnologiespartner'}",
            'class': ''
          },
          // {
          //   'title': "Partner Portal Login",
          //   'description': "",
          //   'href': 'partners/become-a-partner.htm',

          // },
        ]
      ]
    },
    {
      'title': "Resources",
      'href': 'social-impact-esg.htm',
      'dellMetrics': "{'btnname':'nav|sub|cloud|resources'}",
      // 'submenu': [
      //   [
      //     {
      //       'title': "Cloud Journey Ebook",
      //       'description': "",
      //       'href': 'resources/cloud-journey-ebook.htm',
      //       'dellMetrics': "{'btnname':'nav|sub|cloud|resources|cloudjourneyebook'}",
      //       'class': 'hidden'
      //     },
      //     {
      //       'title': "Multi Cloud Sprawl",
      //       'description': "",
      //       'href': 'resources/multi-cloud-sprawl.htm',
      //       'dellMetrics': "{'btnname':'nav|sub|cloud|resources|multicloudsprawl'}",
      //       'class': 'hidden'
      //     },
      //     {
      //       'title': "Analyst Reports and White Papers",
      //       'description': "",
      //       'href': 'resources/index.htm#tab0=0',
      //       'dellMetrics': "{'btnname':'nav|sub|cloud|resources|analystreportsandwhitepapers'}",
      //     },
      //     {
      //       'title': "Solution Briefs and Data Sheets",
      //       'description': "",
      //       'href': 'resources/index.htm#tab0=1',
      //       'dellMetrics': "{'btnname':'nav|sub|cloud|resources|solutionbriefsanddatasheets'}",
      //     },
      //     {
      //       'title': "Infographics and eBooks",
      //       'description': "",
      //       'href': 'resources/index.htm#tab0=2',
      //       'dellMetrics': "{'btnname':'nav|sub|cloud|resources|infographicsandebooks'}",
      //     },
      //     {
      //       'title': "Videos",
      //       'description': "",
      //       'href': 'resources/index.htm#tab0=3',
      //       'dellMetrics': "{'btnname':'nav|sub|cloud|resources|videos'}",
      //     },
      //     {
      //       'title': "Blogs",
      //       'description': "",
      //       'href': 'resources/index.htm#tab0=4',
      //       'dellMetrics': "{'btnname':'nav|sub|cloud|resources|blogs'}",
      //     },
      //     {
      //       'title': "Webinars",
      //       'description': "",
      //       'href': 'resources/index.htm#tab0=5',
      //       'dellMetrics': "{'btnname':'nav|sub|cloud|resources|webinars'}",
      //     },
      //     {
      //       'title': "How-to Demos",
      //       'description': "",
      //       'href': 'resources/index.htm#tab0=6',
      //       'dellMetrics': "{'btnname':'nav|sub|cloud|resources|how-to-demos'}",
      //     }
      //   ]
      // ]
    }
  ]
};

var jsonEdgeComputing = {
  options: {
    hideNavRoot: true,
    isAnchorNav: true,
    isSticky: true,
    AEMPath: ""
  },
  navroot: {
    'title': "Edge Computing",
    'href': '#',
    'target': '',
    // 'dellMetrics': "{'btnname':'tab|header'}",
    'class': ''
  },
  menu:
  [
    {
      'title': "Overview",
      'href': '#overview',
      'dellMetrics': "{'btnname':'tab|overview'}",
      'class': "dt-anchor-nav-link"
    },
    {
      'title': "Industries",
      'href': '#indu',
      'target': '_blank',
      'dellMetrics': "{'btnname':'tab|Industries'}",
      'class': "dt-anchor-nav-link"
    },
    {
      'title': "Resources",
      'href': '#res',
      'dellMetrics': "{'btnname':'tab|Resources'}",
      'class': "dt-anchor-nav-link"
    },
    {
      'title': "OEM Solutions",
      'href': '#oem',
      'dellMetrics': "{'btnname':'tab|Oemsolutions'}",
      'class': "dt-anchor-nav-link"
    },
    {
      'title': "Products",
      'href': '#prod',
      'dellMetrics': "{'btnname':'tab|Products'}",
      'class': "dt-anchor-nav-link"
    },
    {
      'title': "Additional Offerings",
      'href': '#aof',
      'dellMetrics': "{'btnname':'tab|Additionalofferings'}",
      'class': "dt-anchor-nav-link"
    }
  ]
};

var jsonApexUseCases = {
  options: {
    hideNavRoot: true,
    isAnchorNav: true,
    isSticky: true,
    AEMPath: ""
  },
  navroot: {
    'title': "Apex Use Cases",
    'href': '#',
    'target': '',
    // 'dellMetrics': "{'btnname':'tab|header'}",
    'class': ''
  },
  menu:
  [
    {
      'title': "Why APEX",
      'href': '#why-apex',
      'dellMetrics': "{'btnname':'tab|why-apex'}",
      'class': "dt-anchor-nav-link"
    },
    {
      'title': "Use Cases",
      'href': '#use-cases',
      'target': '_blank',
      'dellMetrics': "{'btnname':'tab|use-cases'}",
      'class': "dt-anchor-nav-link"
    },
    {
      'title': "Industries",
      'href': '#verticals',
      'dellMetrics': "{'btnname':'tab|verticals'}",
      'class': "dt-anchor-nav-link"
    },
    {
      'title': "Customer Stories",
      'href': '#customer-stories',
      'dellMetrics': "{'btnname':'tab|customer'}",
      'class': "dt-anchor-nav-link"
    }
  ]
};

var jsonSocialImpact2030Goals = {
  options: {
    hideNavRoot: true,
    isAnchorNav: true,
    classes: "has-max-width"
  },
  navroot: {
    'title': "2030 Goals",
    'href': '#',
    'target': '',
    // 'dellMetrics': "{'btnname':'tab|header'}",
    'class': ''
  },
  menu:
  [
    {
      'title': "Moonshot Goals",
      'href': '#moonshot',
      'dellMetrics': "{'btnname':'tab|Moonshot'}",
      'class': "dt-anchor-nav-link"
    },
    {
      'title': "Advancing Sustainability",
      'href': '#advancing',
      'dellMetrics': "{'btnname':'tab|Advancing'}",
      'class': "dt-anchor-nav-link"
    },
    {
      'title': "Cultivating Inclusion",
      'href': '#cultivating',
      'dellMetrics': "{'btnname':'tab|Cultivating'}",
      'class': "dt-anchor-nav-link"
    },
    {
      'title': "Transforming Lives",
      'href': '#transforming',
      'dellMetrics': "{'btnname':'tab|Transforming'}",
      'class': "dt-anchor-nav-link"
    },
    {
      'title': "Upholding Ethics & Privacy",
      'href': '#upholding',
      'dellMetrics': "{'btnname':'tab|Upholding'}",
      'class': "dt-anchor-nav-link"
    }
  ]
};

var jsonWhatWeDo = {
  options: {
    hideNavRoot: false,
    isAnchorNav: false,
    isSticky: true,
    classes: "",
    AEMPath: "/content/emc/en/what-we-do/"
  },
  navroot: {
    'title': "What We Do",
    'href': 'index.htm',
    'target': '',
    'dellMetrics': "{'btnname':'nav|sub|what-we-do|home'}",
  },
  menu:
  [
    // {
    //   'title': "Home",
    //   'href': 'index.htm',
    //   'dellMetrics': "{'btnname':'nav|sub|what-we-do|index'}",
    //   'class': 'mobile-only'
    // },
    {
      'title': "Overview",
      'href': 'index.htm',
      'dellMetrics': "{'btnname':'nav|sub|what-we-do|overview'}",
    },
    {
      'title': "End-to-end Solutions",
      'href': 'end-to-end-solutions.htm',
      'dellMetrics': "{'btnname':'nav|sub|what-we-do|end-to-end'}",
    },
    {
      'title': "Flexible IT",
      'href': 'multi-cloud-flexibility.htm',
      'dellMetrics': "{'btnname':'nav|sub|what-we-do|flexible-it'}",
    },
    {
      'title': "Work from Anywhere",
      'href': 'work-from-anywhere.htm',
      'dellMetrics': "{'btnname':'nav|sub|what-we-do|work-from-anywhere'}",
    },
    {
      'title': "Innovating with Data",
      'href': 'data-innovation.htm',
      'dellMetrics': "{'btnname':'nav|sub|what-we-do|innovating-with-data'}",
    }
  ]
};

var jsonCustomerEngagementPrograms = {
  options: {
    hideNavRoot: false,
    isAnchorNav: false,
    isSticky: true,
    classes: "",
    AEMPath: "${aemdomain}/what-we-do/customer-engagement-programs/"
  },
  navroot: {
    'title': "Customer Engagement Programs",
    'href': 'index.htm',
    'dellMetrics': "{'btnname':'nav|sub|what-we-do|home'}",
  },
  menu:
  [
    // {
    //   'title': "Home",
    //   'href': 'index.htm',
    //   'dellMetrics': "{'btnname':'nav|sub|what-we-do|index'}",
    //   'class': 'mobile-only'
    // },
    {
      'title': "Overview",
      'href': 'index.htm',
      'dellMetrics': "{'btnname':'nav|sub|what-we-do|customer-engagement-programs|overview'}",
    },
    {
      'title': "Executive Briefing Program",
      'href': 'executive-briefing-program.htm',
      'dellMetrics': "{'btnname':'nav|sub|what-we-do|customer-engagement-programs|executive-briefing-program'}",
    },
    {
      'title': "Customer Solution Centers",
      'href': 'customer-solution-centers.htm',
      'dellMetrics': "{'btnname':'nav|sub|what-we-do|customer-engagement-programs|customer-solution-centers'}",
    },
    {
      'title': "Why Engage",
      'href': 'why-engage.htm',
      'dellMetrics': "{'btnname':'nav|sub|what-we-do|customer-engagement-programs|why-engage'}",
    },
    {
      'title': "Locations",
      'href': 'cep-locations.htm',
      'dellMetrics': "{'btnname':'nav|sub|what-we-do|customer-engagement-programs|cep-locations'}",
    },
    {
      'title': "Schedule an Engagement",
      'href': 'schedule-an-engagement.htm',
      'dellMetrics': "{'btnname':'nav|sub|what-we-do|customer-engagement-programs|schedule-an-engagement'}",
    },
    
  ]
};

var jsonConnectedIO = {
  options: {
    hideNavRoot: false,
    isAnchorNav: false,
    isSticky: true,
    classes: "",
    AEMPath: "${aemdomain}/what-we-do/",
    // AEMPath: "/rebellion-workspace/dell-tech-cloud-site/html/"
  },
  navroot: {
    'title': "CIO Imperatives",
    'href': 'connectedcio.htm',
    'target': '',
    'dellMetrics': "{'btnname':'nav|sub|what-we-do|home'}",
  },
  menu:
  [
    // {
    //   'title': "Home",
    //   'href': 'index.htm',
    //   'dellMetrics': "{'btnname':'nav|sub|what-we-do|index'}",
    //   'class': 'mobile-only'
    // },
    {
      'title': "Overview",
      'href': 'connectedcio.htm',
      'target': '',
      'dellMetrics': "{'btnname':'nav|sub|what-we-do|connectedcio|overview'}",
    },
    {
      'title': "Increase Business Agility",
      'href': 'connectedcio/drive-business-agility.htm',
      'target': '',
      'dellMetrics': "{'btnname':'nav|sub|what-we-do|connectedcio|drive-business-agility'}",
    },
    {
      'title': "Work and Learn from Anywhere",
      'href': 'connectedcio/work-learn-anywhere.htm',
      'target': '',
      'dellMetrics': "{'btnname':'nav|sub|what-we-do|connectedcio|work-learn-anywhere'}",
    },
    {
      'title': "Create New Value",
      'href': 'connectedcio/create-new-value.htm',
      'target': '',
      'dellMetrics': "{'btnname':'nav|sub|what-we-do|connectedcio|create-new-value'}",
    }
  ]
};

var jsonDTWPostEvent = {
  options: {
    hideNavRoot: false,
    isAnchorNav: false,
    isSticky: true,
    classes: "dtw-subnav",
    AEMPath: "/content/emc/en/events/delltechnologiesworld/"
  },
  navroot: {
    'title': "/World",
    'href': 'index.htm',
    'target': '',
    'dellMetrics': "{'btnname':'nav|sub|dtw|index'}",
  },
  menu:
  [
    // {
    //   'title': "Home",
    //   'href': '/post-event/index.htm',
    //   'dellMetrics': "{'btnname':'nav|sub|dtw|post-event|index'}",
    //   'class': 'mobile-only'
    // },
    // {
    //   'title': "/World",
    //   'href': '/index.htm',
    //   'dellMetrics': "{'btnname':'nav|sub|dtw|index'}",
    // },
    {
      'title': "The Experience",
      'href': 'index.htm',
      'dellMetrics': "{'btnname':'nav|sub|dtw|experience'}",
      'class': 'delltechnologiesworld-link'
    },
    {
      'title': "Content Catalog",
      'href': 'sessions.htm',
      'dellMetrics': "{'btnname':'sub|dtw|content-catalog'}",
      'class': 'delltechnologiesworld-link'
    },
    {
      'title': "Speakers",
      'href': 'speakers.htm',
      'dellMetrics': "{'btnname':'nav|sub|dtw|speakers'}",
      'class': 'delltechnologiesworld-link'
    },
    {
      'title': "Sponsors",
      'href': 'sponsors.htm',
      'dellMetrics': "{'btnname':'nav|sub|dtw|sponsors'}",
      'class': 'delltechnologiesworld-link'
    },
    {
      'title': "News",
      'href': 'https://blog.delltechnologiesworld.com/',
      'dellMetrics': "{'btnname':'nav|sub|dtw|news'}",
      'class': 'delltechnologiesworld-link'
    }
  ],
  sideMenu:
  [
    // {
    //   'title': "Save the Date",
    //   'href': '/content/dam/uwaem/production-design-assets/en/microsites/dellemcworld/2021/ics/dtw21-savethedate.ics',
    //   'dellMetrics': "{'btnname':'nav|sub|dtw|save-the-date'}",
    //   'class': 'delltechnologiesworld-link with-icon icon-save-the-date'
    // },
    {
      'title': "Sign Up",
      'href': 'https://onlinexperiences.com/Launch/Event.htm?ShowKey=147757',
      'target': '_blank',
      'dellMetrics': "{'btnname':'nav|sub|dtw|sign-up-or-log-in'}",
      'class': 'delltechnologiesworld-link blue-cta with-icon icon-sign-up'
    }
  ]
};

var jsonESG = {
  options: {
    hideNavRoot: false,
    isAnchorNav: false,
    isSticky: true,
    classes: "",
    forceMoreButton: true,
    AEMPath: "/content/emc/en/"
  },
  navroot: {
    'title': "ESG Resources",
    'href': 'corporate/social-impact/esg-resources.htm',
    'target': '',
    'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|esg-resources'}",
    'submenu': [
      [
        {
          'title': "Social Impact",
          // 'description': "Achieve business agility, reliability and control with Cloud solutions tailored to your organization.",
          'href': 'corporate/social-impact.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|'}"
        },
        {
          'title': "Advancing Sustainability",
          // 'description': "Modernize your data center and apps, unify operations, customize to scale and migrate workloads to any Cloud.",
          "href": 'corporate/social-impact/advancing-sustainability.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|advancing-sustainability'}"
        },
        {
          'title': "Cultivating Inclusion",
          // 'description': "Explore our options to enhance your IT infrastructure with our Dell Technologies On Demand portfolio.",
          'href': 'corporate/social-impact/cultivating-inclusion.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|cultivating-inclusion'}"
        },
        {
          'title': "Transforming Lives",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'corporate/social-impact/transforming-lives.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|transforming-lives'}"
        },
        {
          'title': "Upholding Ethics & Privacy",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'corporate/social-impact/upholding-ethics-and-privacy.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|upholding-ethics-and-privacy'}"
        },
        // {
        //   'title': "Our Progress",
        //   // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
        //   'href': 'corporate/social-impact/reporting/fy21-progress-made-real-report.htm',
        //   'target': '',
        //   'dellMetrics': "{'btnname':'nav|sub|'}"
        // },
        {
          'title': "Goals & Reporting",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'corporate/social-impact/esg-resources/reports.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|esg-resources-reports'}"
        },
        {
          'title': "ESG Resources",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'corporate/social-impact/esg-resources.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|esg-resources}",
          'class': 'mobile-active active'
        }
      ]
    ]
  },
  menu:
  [
    // {
    //   'title': "Home",
    //   'href': 'index.htm',
    //   'dellMetrics': "{'btnname':'nav|sub|what-we-do|index'}",
    //   'class': 'mobile-only'
    // },
    {
      'title': "Overview",
      'href': 'corporate/social-impact/esg-resources.htm',
      'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|esg-resources'}",
    },
    {
      'title': "Governance",
      'href': 'corporate/social-impact/esg-resources/esg-governance.htm',
      'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|esg-resources|esg-governance'}",
    },
    {
      'title': "Regulatory Compliance",
      'href': 'corporate/social-impact/esg-resources/regulatory-compliance.htm',
      'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|esg-resources|regulatory-compliance'}",
    },
    {
      'title': "Policies",
      'href': 'corporate/social-impact/esg-resources/policies-positions.htm',
      'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|esg-resources|policies-positions'}",
    },
    {
      'title': "Certifications & Ecolabels",
      'href': 'corporate/social-impact/esg-resources/certifications.htm',
      'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|esg-resources|certifications'}",
    },
    {
      'title': "Reports",
      'href': 'corporate/social-impact/esg-resources/reports.htm',
      'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|esg-resources|reports'}",
    },
    {
      'title': "Reporting Frameworks",
      'href': 'corporate/social-impact/esg-resources/reporting-frameworks.htm',
      'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|esg-resources|reporting-frameworks'}"
    },
    {
      'title': "Awards",
      'href': 'corporate/social-impact/reporting/awards-and-recognition.htm',
      'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|reporting|awards-and-recognition'}"
    }
  ]
};

var jsonAdvancingSustainability = {
  options: {
    hideNavRoot: false,
    isAnchorNav: false,
    isSticky: true,
    classes: "",
    forceMoreButton: true,
    AEMPath: "/content/emc/en/"
  },
  navroot: {
    'title': "Advancing Sustainability",
    'href': 'corporate/social-impact/advancing-sustainability.htm',
    'target': '',
    'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|advancing-sustainability'}",
    'submenu': [
      [
        {
          'title': "Social Impact",
          // 'description': "Achieve business agility, reliability and control with Cloud solutions tailored to your organization.",
          'href': 'corporate/social-impact.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|'}"
        },
        {
          'title': "Advancing Sustainability",
          // 'description': "Modernize your data center and apps, unify operations, customize to scale and migrate workloads to any Cloud.",
          "href": 'corporate/social-impact/advancing-sustainability.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|advancing-sustainability'}",
          'class': 'mobile-active active'
        },
        {
          'title': "Cultivating Inclusion",
          // 'description': "Explore our options to enhance your IT infrastructure with our Dell Technologies On Demand portfolio.",
          'href': 'corporate/social-impact/cultivating-inclusion.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|cultivating-inclusion'}"
        },
        {
          'title': "Transforming Lives",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'corporate/social-impact/transforming-lives.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|transforming-lives'}"
        },
        {
          'title': "Upholding Ethics & Privacy",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'corporate/social-impact/upholding-ethics-and-privacy.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|upholding-ethics-and-privacy'}"
        },
        {
          'title': "Goals & Reporting",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'corporate/social-impact/esg-resources/reports.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|esg-resources-reports'}"
        },
        {
          'title': "ESG Resources",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'corporate/social-impact/esg-resources.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|esg-resources}",
          'class': ''
        }
      ]
    ]
  },
  menu:
  [
    {
      'title': "Overview",
      'href': 'corporate/social-impact/advancing-sustainability.htm',
      'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|advancing-sustainability'}",
    },
    {
      'title': "Climate Action",
      'href': 'corporate/social-impact/advancing-sustainability/climate-action.htm',
      'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|advancing-sustainability|climate-action'}",
    },
    {
      'title': "Circular Economy",
      'href': 'corporate/social-impact/advancing-sustainability/accelerating-the-circular-economy.htm',
      'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|advancing-sustainability|accelerating-the-circular-economy'}",
    },
    {
      'title': "Championing the People",
      'href': 'corporate/social-impact/advancing-sustainability/champion-the-many-people.htm',
      'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|advancing-sustainability|champion-the-many-people'}",
    }
  ]
};

var jsonCultivatingInclusion = {
  options: {
    hideNavRoot: false,
    isAnchorNav: false,
    isSticky: true,
    classes: "",
    forceMoreButton: true,
    AEMPath: "/content/emc/en/"
  },
  navroot: {
    'title': "Cultivating Inclusion",
    'href': 'corporate/social-impact/cultivating-inclusion.htm',
    'target': '',
    'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|cultivating-inclusion'}",
    'submenu': [
      [
        {
          'title': "Social Impact",
          // 'description': "Achieve business agility, reliability and control with Cloud solutions tailored to your organization.",
          'href': 'corporate/social-impact.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|'}"
        },
        {
          'title': "Advancing Sustainability",
          // 'description': "Modernize your data center and apps, unify operations, customize to scale and migrate workloads to any Cloud.",
          "href": 'corporate/social-impact/advancing-sustainability.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|advancing-sustainability'}"
        },
        {
          'title': "Cultivating Inclusion",
          // 'description': "Explore our options to enhance your IT infrastructure with our Dell Technologies On Demand portfolio.",
          'href': 'corporate/social-impact/cultivating-inclusion.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|cultivating-inclusion'}",
          'class': 'mobile-active active'
        },
        {
          'title': "Transforming Lives",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'corporate/social-impact/transforming-lives.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|transforming-lives'}"
        },
        {
          'title': "Upholding Ethics & Privacy",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'corporate/social-impact/upholding-ethics-and-privacy.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|upholding-ethics-and-privacy'}"
        },
        {
          'title': "Goals & Reporting",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'corporate/social-impact/esg-resources/reports.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|esg-resources-reports'}"
        },
        {
          'title': "ESG Resources",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'corporate/social-impact/esg-resources.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|esg-resources}",
          'class': ''
        }
      ]
    ]
  },
  menu:
  [
    {
      'title': "Overview",
      'href': 'corporate/social-impact/cultivating-inclusion.htm',
      'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|cultivating-inclusion'}",
    },
    {
      'title': "Representation",
      'href': 'corporate/social-impact/cultivating-inclusion/representation.htm',
      'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|cultivating-inclusion|representation'}",
    },
    {
      'title': "Community & Belonging",
      'href': 'corporate/social-impact/cultivating-inclusion/community-and-belonging.htm',
      'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|cultivating-inclusion|community-and-belonging'}",
    },
    {
      'title': "Culture & Impact",
      'href': 'corporate/social-impact/cultivating-inclusion/culture-and-impact.htm',
      'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|cultivating-inclusion|culture-and-impact'}",
    },
    {
      'title': "Item One",
      'href': 'corporate/social-impact/cultivating-inclusion/culture-and-impact.htm',
      'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|cultivating-inclusion|item-one'}",
    },
    {
      'title': "Item Two",
      'href': 'corporate/social-impact/cultivating-inclusion/culture-and-impact.htm',
      'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|cultivating-inclusion|item-two'}",
    },
    {
      'title': "Item Three",
      'href': 'corporate/social-impact/cultivating-inclusion/culture-and-impact.htm',
      'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|cultivating-inclusion|item-three'}",
    }
  ]
};

var jsonTransformingLives = {
  options: {
    hideNavRoot: false,
    isAnchorNav: false,
    isSticky: true,
    classes: "",
    forceMoreButton: true,
    AEMPath: "/content/emc/en/"
  },
  navroot: {
    'title': "Transforming Lives",
    'href': 'corporate/social-impact/transforming-lives.htm',
    'target': '',
    'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|transforming-lives'}",
    'submenu': [
      [
        {
          'title': "Social Impact",
          // 'description': "Achieve business agility, reliability and control with Cloud solutions tailored to your organization.",
          'href': 'corporate/social-impact.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|'}"
        },
        {
          'title': "Advancing Sustainability",
          // 'description': "Modernize your data center and apps, unify operations, customize to scale and migrate workloads to any Cloud.",
          "href": 'corporate/social-impact/advancing-sustainability.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|advancing-sustainability'}"
        },
        {
          'title': "Cultivating Inclusion",
          // 'description': "Explore our options to enhance your IT infrastructure with our Dell Technologies On Demand portfolio.",
          'href': 'corporate/social-impact/cultivating-inclusion.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|cultivating-inclusion'}"
        },
        {
          'title': "Transforming Lives",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'corporate/social-impact/transforming-lives.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|transforming-lives'}",
          'class': 'mobile-active active'
        },
        {
          'title': "Upholding Ethics & Privacy",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'corporate/social-impact/upholding-ethics-and-privacy.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|upholding-ethics-and-privacy'}"
        },
        {
          'title': "Goals & Reporting",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'corporate/social-impact/esg-resources/reports.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|esg-resources-reports'}"
        },
        {
          'title': "ESG Resources",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'corporate/social-impact/esg-resources.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|esg-resources}",
          'class': ''
        }
      ]
    ]
  },
  menu:
  [
    {
      'title': "Overview",
      'href': 'corporate/social-impact/transforming-lives.htm',
      'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|transforming-lives'}",
    },
    {
      'title': "Digital Inclusion",
      'href': 'corporate/social-impact/transforming-lives/digital-inclusion-for-education.htm',
      'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|transforming-lives|digital-inclusion-for-education'}",
    },
    {
      'title': "Healthcare",
      'href': 'corporate/social-impact/transforming-lives/healthcare.htm',
      'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|transforming-lives|healthcare'}",
    },
    {
      'title': "Giving and Volunteering",
      'href': 'corporate/social-impact/transforming-lives/employee-empowerment.htm',
      'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|transforming-lives|employee-empowerment'}",
    }
  ]
};

var jsonEthicsAndPrivacy = {
  options: {
    hideNavRoot: false,
    isAnchorNav: false,
    isSticky: true,
    classes: "",
    forceMoreButton: true,
    AEMPath: "/content/emc/en/"
  },
  navroot: {
    'title': "Upholding Ethics & Privacy",
    'href': 'corporate/social-impact/upholding-ethics-and-privicy.htm',
    'target': '',
    'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|upholding-ethics-and-privicy'}",
    'submenu': [
      [
        {
          'title': "Social Impact",
          // 'description': "Achieve business agility, reliability and control with Cloud solutions tailored to your organization.",
          'href': 'corporate/social-impact.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|'}"
        },
        {
          'title': "Advancing Sustainability",
          // 'description': "Modernize your data center and apps, unify operations, customize to scale and migrate workloads to any Cloud.",
          "href": 'corporate/social-impact/advancing-sustainability.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|advancing-sustainability'}"
        },
        {
          'title': "Cultivating Inclusion",
          // 'description': "Explore our options to enhance your IT infrastructure with our Dell Technologies On Demand portfolio.",
          'href': 'corporate/social-impact/cultivating-inclusion.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|cultivating-inclusion'}"
        },
        {
          'title': "Transforming Lives",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'corporate/social-impact/transforming-lives.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|transforming-lives'}"
        },
        {
          'title': "Upholding Ethics & Privacy",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'corporate/social-impact/upholding-ethics-and-privacy.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|upholding-ethics-and-privacy'}",
          'class': 'mobile-active active'
        },
        {
          'title': "Goals & Reporting",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'corporate/social-impact/esg-resources/reports.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|esg-resources-reports'}"
        },
        {
          'title': "ESG Resources",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'corporate/social-impact/esg-resources.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|esg-resources}",
          'class': ''
        }
      ]
    ]
  },
  menu:
  [
    {
      'title': "Overview",
      'href': 'corporate/social-impact/upholding-ethics-and-privacy.htm',
      'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|upholding-ethics-and-privacy'}",
    }
  ]
};

var jsonSocialImpact = {
  options: {
    hideNavRoot: false,
    isAnchorNav: false,
    isSticky: true,
    classes: "",
    forceMoreButton: true,
    AEMPath: "/content/emc/en/"
  },
  navroot: {
    'title': "ESG & Impact",
    'href': 'corporate/social-impact.htm',
    'target': '',
    'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact'}",
    'submenu': [
      [
        {
          'title': "ESG & Impact",
          // 'description': "Achieve business agility, reliability and control with Cloud solutions tailored to your organization.",
          'href': 'corporate/social-impact.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|'}",
          'class': 'mobile-active active'
        },
        {
          'title': "Advancing Sustainability",
          // 'description': "Modernize your data center and apps, unify operations, customize to scale and migrate workloads to any Cloud.",
          "href": 'corporate/social-impact/advancing-sustainability.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|advancing-sustainability'}"
        },
        {
          'title': "Cultivating Inclusion",
          // 'description': "Explore our options to enhance your IT infrastructure with our Dell Technologies On Demand portfolio.",
          'href': 'corporate/social-impact/cultivating-inclusion.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|cultivating-inclusion'}"
        },
        {
          'title': "Transforming Lives",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'corporate/social-impact/transforming-lives.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|transforming-lives'}"
        },
        {
          'title': "Upholding Ethics & Privacy",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'corporate/social-impact/upholding-ethics-and-privacy.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|upholding-ethics-and-privacy'}",
        },
        {
          'title': "Goals & Reporting",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'corporate/social-impact/esg-resources/reports.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|esg-resources-reports'}"
        },
        {
          'title': "ESG Resources",
          // 'description': "Seamless online experience designed to manage all your cloud workloads and services from a single web interface.",
          'href': 'corporate/social-impact/esg-resources.htm',
          'target': '',
          'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact|esg-resources}",
          'class': ''
        }
      ]
    ]
  },
  menu:
  [
    {
      'title': "Overview",
      'href': 'corporate/social-impact.htm',
      'dellMetrics': "{'btnname':'nav|sub|corporate|social-impact'}",
    }
  ]
};

var jsonPPE = {
  options: {
    hideNavRoot: false,
    isAnchorNav: false,
    isSticky: true,
    classes: "",
    dropdownStyle: "style-2",
    AEMPath: "/content/emc/en/"
  },
  navroot: {
    'title': "Benefits & Requirements",
    'href': 'index.htm',
    'target': '',
    'dellMetrics': "{'btnname':'nav|sub|eee'}",
  },
  menu:
  [
    {
      'title': "Home",
      'href': 'index.htm',
      'dellMetrics': "{'btnname':'nav|sub|eee'}",
      'class': 'mobile-only'
    },
    {
      'title': "Introduction",
      'href': 'EEE.htm',
      'dellMetrics': "{'btnname':'nav|sub|eee'}",
    },
    {
      'title': "Benefits",
      'href': 'javascript:void();',
      'target': '_blank',
      'dellMetrics': "{'btnname':'nav|sub|eee'}",
      'submenu': [
        [
          {
            'title': "Incentives Grid",
            'href': 'EEE.htm',
            'dellMetrics': "{'btnname':'nav|sub|eee'}",
          },
          {
            'title': "Incentives Definitions",
            'href': 'EEE.htm',
            'dellMetrics': "{'btnname':'nav|sub|eee'}",
          },
          {
            'title': "End Customer Validation Report",
            'href': 'EEE.htm',
            'dellMetrics': "{'btnname':'nav|sub|eee'}"
          },
          {
            'title': "APEX Custom Solutions Incentives",
            'href': 'EEE.htm',
            'dellMetrics': "{'btnname':'nav|sub|eee'}"
          },
          {
            'title': "Additional Benefits",
            'href': 'EEE.htm',
            'dellMetrics': "{'btnname':'nav|sub|eee'}"
          }
        ]
      ]
    },
    {
      'title': "Requirements",
      'href': 'javascript:void();',
      'dellMetrics': "{'btnname':'nav|sub|eee'}",
      'submenu': [
        [
          {
            'title': "overview",
            'href': 'eee.htm',
            'class': '',
            'dellMetrics': "{'btnname':'nav|sub|eee'}"
          },
          {
            'title': "3 Steps for Program Tier Compliance",
            'href': 'EEE.htm',
            'dellMetrics': "{'btnname':'nav|sub|eee'}"
          }
        ]
      ]
    },
    {
      'title': "Training",
      'href': 'javascript:void();',
      'dellMetrics': "{'btnname':'nav|sub|eee'}",
      'submenu': [
        [
          {
            'title': "Training Requirements",
            'href': 'eee.htm',
            'dellMetrics': "{'btnname':'nav|sub|eee'}"
          },
          {
            'title': "Training & Competencies",
            'href': 'EEE.htm',
            'dellMetrics': "{'btnname':'nav|sub|eee'}"
          },
          {
            'title': "Competency Resource Requirements",
            'href': 'EEE.htm',
            'dellMetrics': "{'btnname':'nav|sub|eee'}"
          },
          {
            'title': "Credential Learning",
            'href': 'EEE.htm',
            'dellMetrics': "{'btnname':'nav|sub|eee'}"
          },
          {
            'title': "Certifications Training",
            'href': 'EEE.htm',
            'dellMetrics': "{'btnname':'nav|sub|eee'}"
          },
          {
            'title': "Powered by Dell Technologies Designation",
            'href': 'EEE.htm',
            'dellMetrics': "{'btnname':'nav|sub|eee'}"
          }
        ]
      ]
    },
    {
      'title': "Program Timeline",
      'href': 'EEE.htm',
      'dellMetrics': "{'btnname':'nav|sub|eee'}",
    },
    {
      'title': "FAQ & Glossary",
      'href': 'EEE.htm',
      'dellMetrics': "{'btnname':'nav|sub|eee'}",
    }
  ]
};



/* eslint-enable */

(function (DTCLOUD) {
  'use strict';


  /* SUBMENU
  ========================================================================== */
  DTCLOUD.submenu = {
    init: function () {
      console.log('DTCLOUD.submenu.init')
      this.json = jsonAdvancingSustainability;
      this.submenu = null
      this.submenuItems = null
      this.AEMPath = this.json.options.AEMPath
      this.isSticky = this.json.options.isSticky
      this.dropdownStyle = this.json.options.dropdownStyle
      this.forceMoreButton = this.json.options.forceMoreButton
      this.localPathsArray = [
        {
          localDomain: 'io.local',
          localDirectory: '/rebellion-workspace/dell-tech-cloud-site/html/'
        }
      ]
      this.activeClick = null;

      // DTCLOUD.submenu.parseJSON();
      
      if(jQuery('.rdc-header-subnav.force-more-button').length > 0) {
        DTCLOUD.submenu.createMoreNav();
        
        window.addEventListener('resize', DTCLOUD.submenu.createMoreResizeEventHandler)
      }

      setTimeout(function () {
        if(jQuery('.rdc-header-subnav.force-more-button').length > 0) {
          DTCLOUD.submenu.createMoreResizeEventHandler()
          jQuery('.rdc-header-subnav.force-more-button').addClass('force-more-button-show')
        }
      }, 100)

      DTCLOUD.submenu.bindEvents();

      // DTCLOUD.submenu.fixPath(); // for local testing
      DTCLOUD.submenu.selectActive();

      DTCLOUD.submenu.addAria();

      window.addEventListener('resize', DTCLOUD.submenu.resizeEventHandler)
      window.addEventListener('scroll', DTCLOUD.submenu.scrollEventHandler)

      if(jQuery('.ghf').length > 0){
        $('body').addClass('has-ghf')
      }
      if(jQuery('#unified-masthead').length > 0){
        $('body').addClass('has-unified-masthead')
      }
      if(jQuery('.rdc-anchor-nav').length > 0){
        $('body').addClass('has-rdc-anchor-nav')
      }
      if(jQuery('.rdc-header-subnav:not(.rdc-anchor-nav)').length > 0){
        $('body').addClass('has-rdc-sub-nav')
      }
    },

    resizeEventHandler: function () {
      if (DTCLOUD.submenu.submenu.find('.has-dropdown.dd-open').find('.rdc-header-menu-dropdown')[0]) {
        DTCLOUD.submenu.setDropDownPosition(DTCLOUD.submenu.submenu.find('.has-dropdown.dd-open').find('.rdc-header-menu-dropdown')[0])
      }
    },

    scrollEventHandler: function () {
      // console.log('scrolled');
      var offset = 60;
      if(jQuery('#unified-masthead').length > 0){
        offset = 0;
      }
      if(jQuery('body.delltechnologies-corporate').length > 0){
        offset = 80;
      }

      if(jQuery('body.spkc.widget-sticky-nav').length > 0){
        // console.log('found spkc')
        offset = 0;
      }

      var navs = document.getElementsByClassName('rdc-header-subnav');

      for (var index = 0; index < navs.length; index++) {
        var nav = navs[index];
        var anchorNavRect = nav.getBoundingClientRect();
        var amchorNavY = anchorNavRect.y;
        var isSticky = nav.classList.contains('is-sticky') ? true : false;

        // console.log(amchorNavY)

        var scrollanchor = amchorNavY-offset;

        if (isSticky && scrollanchor < 0) {
          jQuery(nav).addClass('rdc-anchor-nav-fixed');
        } else {
          jQuery(nav).removeClass('rdc-anchor-nav-fixed');
        }
      };
    },

    addAria:function () {
      var rdcSubnav= document.getElementsByClassName('rdc-header-subnav')[0]
      rdcSubnav.setAttribute('role', 'navigation')
      rdcSubnav.setAttribute('aria-label', 'sub-navigation')

      var rdcHeaderLeft = document.getElementsByClassName('rdc-header-left')[0]
      var hasDropdown = rdcHeaderLeft.getElementsByClassName('has-dropdown')
      // console.log(hasDropdown)
      if (hasDropdown.length > 0) {
        // console.log('left has dropdown')
        var rdcHeaderLeftButton = rdcHeaderLeft.querySelectorAll('.rdc-header-page-title > a')[0]
        rdcHeaderLeftButton.setAttribute('role', 'button')
        rdcHeaderLeftButton.setAttribute('aria-expanded', 'false')
        // console.log(rdcHeaderLeftButton)
      }
    },

    selectActive: function () {
      console.log('selectActive')
      var subnav = document.querySelector('.rdc-header-subnav:not(.rdc-anchor-nav)');
      // console.log('subnav', subnav);

      if (subnav) {
        var firstTier = subnav.getElementsByClassName('first-tier-list-item')
        for (var i = 0; i < firstTier.length; i++) {
          // console.log(firstTier[i])
          var firstTier_a = firstTier[i].getElementsByTagName('a')[0]
          // console.log(firstTier_a)
          // for (var s = 0; s < firstTier_a.length; s++) {
          var a = firstTier_a
          // console.log(a.getAttribute('href'))
          try {
            var hrefAll = a.getAttribute('href')
            var hrefAllSlice = hrefAll.substring(hrefAll.indexOf('com') + 4);
            // console.log(hrefAllSlice)
            // var href = a.getAttribute('href')//.replace('https://preview.emc.com/', '')
            // console.log(window.location.href)
            // console.log(jQuery('.rdc-anchor-nav').length)
            var href = DTCLOUD.submenu.removeHash(hrefAllSlice)
            // console.log(href)
            if (window.location.href.indexOf(href) > -1) {
              // console.log('found one', href)
              // console.log(a.parentNode)
              // a.classList.add('active-a')
              a.setAttribute('aria-current', 'page')
              a.parentNode.classList.add('active')
              // firstTier[i].parentNode.classList.add('active')
            }
          } catch (error) {
            console.log(error);
          }
          
          // }
        }

        var submenRightDiv = document.getElementsByClassName('rdc-header-right')[0];

        var dd = submenRightDiv.getElementsByClassName('rdc-header-menu-dropdown')
        // var location = window.location
        // console.log('location', location)
        // var origin = location.origin

        for (var i = 0; i < dd.length; i++) {
          console.log(dd[i])
          var dd_a = dd[i].getElementsByTagName('a')
          console.log(dd_a)
          for (var s = 0; s < dd_a.length; s++) {
            var a = dd_a[s]
            // console.log(a.getAttribute('href'))
            var href = a.getAttribute('href')//.replace('https://preview.emc.com/', '')
            // console.log(window.location.href)
            // console.log(href)
            href = DTCLOUD.submenu.removeHash(href)
            if (window.location.href.indexOf(href) > -1) {
              console.log('found one', href)
              console.log(a);
              a.classList.add('active')
              a.parentNode.classList.add('active')
              dd[i].parentNode.classList.add('active')
            }
          }
        }
      }
    },

    removeHash: function (href) {
      var myLink = href.split('#')[0];
      // console.log(myLink)
      return myLink;
    },

    parseJSON: function () {
      var RDCHeaderSubnav = document.getElementsByClassName('rdc-header-subnav')[0]

      //  clear subnav 
      RDCHeaderSubnav.innerHTML = ''

      // Build subnav
      var submenInnerDiv = document.createElement('div')
      submenInnerDiv.classList.add('rdc-header-inner');
      RDCHeaderSubnav.appendChild(submenInnerDiv)

      // add is-sticky class to subnav container
      // console.log(this.json.options.isSticky)
      if(this.json.options.isSticky) {
        RDCHeaderSubnav.classList.add('is-sticky')
      }

      if(this.json.options.forceMoreButton) {
        RDCHeaderSubnav.classList.add('force-more-button')
      }

      var submenWrapperDiv = document.createElement('div')
      submenWrapperDiv.classList.add('rdc-header-wrapper');
      submenInnerDiv.appendChild(submenWrapperDiv)

      // submeu left
      var submenLeftDiv = document.createElement('div')
      submenLeftDiv.classList.add('rdc-header-left');
      submenWrapperDiv.appendChild(submenLeftDiv)

      try{
        if (this.json.options.hideNavRoot) {
          console.log('hideNavRoot', this.json.options.hideNavRoot);
          submenLeftDiv.classList.add('hide-nav-root');
        }
      } catch(err) {
        console.error(err.message);
      }

      try{
        if (this.json.options.classes) {
          // console.log('hideNavRoot', this.json.options.hideNavRoot);
          submenInnerDiv.classList.add(this.json.options.classes);
        }
      } catch(err) {
        console.error(err.message);
      }
      

      var submenLeftTitleDiv = document.createElement('div')
      submenLeftTitleDiv.classList.add('rdc-header-page-title');
      submenLeftDiv.appendChild(submenLeftTitleDiv)

      // var sTitleNode = document.createElement('span')
      var titleTextNode = DTCLOUD.submenu.createANode(this.json.navroot)
      // titleTextNode.classList.add('first-tier')
      console.log(titleTextNode)
      submenLeftTitleDiv.appendChild(titleTextNode)

      if(this.json.navroot.submenu) {
        console.log('navroot.submenu')
        submenLeftTitleDiv.classList.add('has-dropdown')
        DTCLOUD.submenu.createSubmenu(this.json.navroot.submenu, submenLeftTitleDiv)
        submenLeftTitleDiv.querySelectorAll('.rdc-header-menu-dropdown')[0].classList.add('rdc-header-menu-dropdown--style-2')
      }

      // sTitleNode.appendChild(titleTextNode)

      //submeu right
      var submenRightDiv = document.createElement('div')
      submenRightDiv.classList.add('rdc-header-right');
      submenWrapperDiv.appendChild(submenRightDiv)

      var menuContainer = document.createElement('div')
      menuContainer.classList.add('rdc-header-menu');
      menuContainer.classList.add('json-build');
      submenRightDiv.appendChild(menuContainer)


      var ulNode = document.createElement('ul')
      ulNode.classList.add('first-tier-list')
      menuContainer.appendChild(ulNode)

      var menuJSON = this.json.menu
      for (var i = 0; i < menuJSON.length; i++) {
        var liNode = document.createElement('li')
        liNode.classList.add('first-tier-list-item')
        ulNode.appendChild(liNode)
        menuJSON[i].classList = 'first-tier'
        var aNode = DTCLOUD.submenu.createANode(menuJSON[i])
        liNode.appendChild(aNode)

        if (aNode.classList.contains('mobile-only')) {
          console.log('found mobile only parent')
          liNode.classList.add('mobile-only')
        }

        // SUBMENU
        if(menuJSON[i].submenu) {
          liNode.classList.add('has-dropdown')
          DTCLOUD.submenu.createSubmenu(menuJSON[i].submenu, liNode)
        }
      }

      var ulNode = document.createElement('ul')
      ulNode.classList.add('first-tier-list-side-menu')
      menuContainer.appendChild(ulNode)

      var menuJSON = this.json.sideMenu
      console.log('menuJSON, ', menuJSON);
      if(menuJSON) {
        for (var i = 0; i < menuJSON.length; i++) {
          console.log('AAAA');
          var liNode = document.createElement('li')
          liNode.classList.add('first-tier-list-item')
          ulNode.appendChild(liNode)
          menuJSON[i].classList = 'first-tier'
          var aNode = DTCLOUD.submenu.createANode(menuJSON[i])
          liNode.appendChild(aNode)
          console.log('BBBB');

          if (aNode.classList.contains('mobile-only')) {
            console.log('found mobile only parent')
            liNode.classList.add('mobile-only')
          }

          // SUBMENU
          if(menuJSON[i].submenu) {
            liNode.classList.add('has-dropdown')
            DTCLOUD.submenu.createSubmenu(menuJSON[i].submenu, liNode)
          }
        }
      }

      var that = this

      if(this.json.options.forceMoreButton) {
        var menuContainer = document.querySelectorAll('.rdc-header-menu')[0];
        menuContainer.classList.add('has-more-menu-items')
        menuContainer.setAttribute('data-json', JSON.stringify(that.json));
      }
    },

    checkForMoreNav: function () {
      console.log('checkForMoreNav')
      // var that = this
      var menuContainer = document.querySelectorAll('.rdc-header-menu')[0];
      console.log('menuContainer: ', menuContainer)
      var menuItems =Array.prototype.slice.call(menuContainer.querySelectorAll('.rdc-header-menu-item--more-item'))
      console.log(menuItems)
      if (menuItems.length > 0) {
        console.log('HAS MORE ITEMS')
        console.log(this.json)
        // DTCLOUD.submenu.newJson = menuContainer.dataset.json
        // console.log(DTCLOUD.submenu.newJson)
        // window.addEventListener('resize', DTCLOUD.submenu.createMoreResizeEventHandler)
        return true
      }
      return false
    },

    createMoreResizeEventHandler : function () {
      // var menuContainer = document.querySelectorAll('.rdc-header-menu')[0];
      var menuHeaderWrapper = document.querySelectorAll('.rdc-header-wrapper')[0];
      // var menuContainerBounds = menuHeaderWrapper.getBoundingClientRect().width;
      var menuContainerBounds = menuHeaderWrapper.getBoundingClientRect().x + menuHeaderWrapper.getBoundingClientRect().width;
      console.log(menuContainerBounds)
      var windowWidth = window.innerWidth;
      // console.log(JSON.parse(menuContainerBounds))

      // remove more button
      var moreContainer = document.querySelectorAll('.force-more-button .rdc-subnav-more-container')[0];
      if(moreContainer) {
        moreContainer.parentNode.remove()
        var moreSubnavItemsArray = document.querySelectorAll('.rdc-header-menu-item--more-item');
        for (var index = 0; index < moreSubnavItemsArray.length; index++) {
          moreSubnavItemsArray[index].classList.remove('rdc-header-menu-item--more-item')
        }
      }

      var subnavItemsArray = document.querySelectorAll('.force-more-button .first-tier-list-item');
      for (var index = subnavItemsArray.length - 1; index > 0; index--) {
        var elBCR = subnavItemsArray[index].getBoundingClientRect()
        var rightSide = elBCR.x + elBCR.width
        if (windowWidth >= 1024 && rightSide > menuContainerBounds * 0.93) {
          subnavItemsArray[index].querySelectorAll('.rdc-header-menu-item')[0].parentNode.classList.add('rdc-header-menu-item--more-item')
        } else if (windowWidth >= 980 && windowWidth < 1024 && rightSide > menuContainerBounds * 0.9) {
          subnavItemsArray[index].querySelectorAll('.rdc-header-menu-item')[0].parentNode.classList.add('rdc-header-menu-item--more-item')
        }
      }
      if (jQuery('.rdc-header-subnav.force-more-button').length > 0) {
        if(DTCLOUD.submenu.checkForMoreNav()) {
          DTCLOUD.submenu.createMoreNav();
        }
      }

      // moreContainer.parentNode.classList.remove('active')
      DTCLOUD.submenu.selectActive();
    },

    createMoreNav: function () {
      console.log('createMoreNav')
      // var that = this
      // var menuContainer = document.querySelectorAll('.rdc-header-menu')[0];
      // menuContainer.classList.add('has-more-menu-items')
      // menuContainer.setAttribute('data-json', JSON.stringify(that.json));
      // console.log(menuContainer)

      var moreBtnJSON = {
        'title': 'More',
        'href': 'javascript:void();',
        'dellMetrics': "{'btnname':'nav|sub|'}",
        'class': 'rdc-subnav-more-container'
      }

      var ulNode = document.querySelectorAll('.first-tier-list')[0];

      var liNode = document.createElement('li')
      liNode.classList.add('first-tier-list-item')
      liNode.classList.add('has-dropdown')
      ulNode.appendChild(liNode)
      var aNode = DTCLOUD.submenu.createANode(moreBtnJSON)
      aNode.classList.add('first-tier')
      liNode.appendChild(aNode)

      var submenuDivNode = document.createElement('div')
      submenuDivNode.classList.add('rdc-header-menu-dropdown')
      liNode.appendChild(submenuDivNode)
      submenuDivNode.classList.add('rdc-header-menu-dropdown--style-2')

      var submenUllNode = document.createElement('ul')
      submenUllNode.classList.add('second-tier-list')
      submenuDivNode.appendChild(submenUllNode)

      var moreSubnavItemsArray = Array.prototype.slice.call(document.querySelectorAll('.rdc-header-menu-item--more-item'));
      console.log(moreSubnavItemsArray)
      
      if (moreSubnavItemsArray.length > 0) {
        for (var index = 0; index < moreSubnavItemsArray.length; index++) {
          var element = moreSubnavItemsArray[index];
          var clone = element.cloneNode(true);
          console.log(clone)
          clone.classList.remove('first-tier-list-item')
          clone.classList.remove('second-tier-list-item')
          console.log('aaa')
          clone.querySelectorAll('a')[0].classList.remove('first-tier')
          clone.querySelectorAll('a')[0].classList.add('second-tier')
          clone.querySelectorAll('a')[0].classList.remove('rdc-header-menu-item--more-item')
          submenUllNode.appendChild(clone)
        }
  
        var ciArray = null;
        var current = null;
        var myClickedItem = null;
        // this.activeClick = null;
        var that = this;
        $(liNode).find('> a').on('click', function (e) {
          e.preventDefault()
          console.log('.has-dropdown > a')
  
          ciArray = that.submenu.find('.has-dropdown');
          myClickedItem = $(this)[0];
  
          // find current item clicked in ciArray and remove element
          for (var i = 0; i < ciArray.length; i++) {
            current = $(ciArray[i]).find('> a')[0]
  
            if(current === myClickedItem) {
              console.log('found one', i)
              that.activeClick = ciArray.splice(i, 1)
            }
          }
  
          ciArray.removeClass('dd-open')
          $(this).parent().toggleClass('dd-open')
  
          DTCLOUD.submenu.setDropDownPosition($(this).parent().find('.rdc-header-menu-dropdown')[0])
        })
      } else {
        console.log('remove more container')
        var moreContainer = document.querySelectorAll('.rdc-subnav-more-container')[0];
        moreContainer.parentNode.remove();
      }
    },

    createSubmenu: function (submenuObject, container) {
      console.log(submenuObject)
      console.log(container)

      var submenuDivNode = document.createElement('div')
      submenuDivNode.classList.add('rdc-header-menu-dropdown')
      if(this.json.options.dropdownStyle == 'style-2') {
        // RDCHeaderSubnav.classList.add('is-sticky')
        submenuDivNode.classList.add('rdc-header-menu-dropdown--style-2')
      }
      container.appendChild(submenuDivNode)

      var clone = container.getElementsByTagName('a')[0].cloneNode(true)
      clone.classList.add('drop-down-title-button')
      clone.classList.add('mobile-title-clone')
      clone.classList.remove('dellmetrics-dataclick')
      clone.removeAttribute('data-metrics')
      submenuDivNode.appendChild(clone)

      for (var p = 0; p < submenuObject.length; p++) {
        var submenUllNode = document.createElement('ul')
        submenUllNode.classList.add('second-tier-list')
        submenuDivNode.appendChild(submenUllNode)

        var submenu = submenuObject[p]
        for (var s = 0; s < submenu.length; s++) {
          // console.log(submenu[s])
          var submenuLiNode = document.createElement('li')
          submenuLiNode.classList.add('second-tier-list-item')
          // console.log(submenu[s].class)
          if (submenu[s].class) {
            // submenuLiNode.classList.add(submenu[s].class)
            var classArray = submenu[s].class.split(' ')
            for (var i = 0; i < classArray.length; i++) {
              submenuLiNode.classList.add(classArray[i])
            }
          }
          submenuLiNode.classList.add('second-tier-list-item')
          submenUllNode.appendChild(submenuLiNode)
          submenu[s].classList = 'second-tier'
          var aNode = DTCLOUD.submenu.createANode(submenu[s])
          submenuLiNode.appendChild(aNode)

          if(submenu[s].submenu){
            console.log('submenu: ', submenu[s].submenu)
            DTCLOUD.submenu.createSecondarySubmenu(submenu[s].submenu, submenuLiNode)
          }
        }
      }
    },

    createSecondarySubmenu: function (submenuObject, container) {
      var submenuDivNode = document.createElement('div')
      submenuDivNode.classList.add('submenu');
      submenuDivNode.classList.add('secondary');
      container.appendChild(submenuDivNode)

      var submenUllNode = document.createElement('ul')
      submenuDivNode.appendChild(submenUllNode)

      var submenu = submenuObject
      for (var s = 0; s < submenu.length; s++) {
        var submenuLiNode = document.createElement('li')
        submenUllNode.appendChild(submenuLiNode)
        var aNode = DTCLOUD.submenu.createANode(submenu[s])
        submenuLiNode.appendChild(aNode)
      }
    },

    createANode: function (obj) {
      // console.log(obj)
      var aNode = document.createElement('a')

      var absolutePath = ''

      // console.log('obj.href: ' + obj.href)
      // console.log('javascript', obj.href.indexOf('javascript'))
      // console.log('obj.href.indexOf(\'#\')', obj.href.indexOf('#'));
      if (obj.href.indexOf('javascript') == -1 && obj.href.indexOf('http') == -1) {
        absolutePath = this.AEMPath
      }
      if (obj.href.indexOf('#') != -1) {
        absolutePath = ''
      }
      // console.log('absolutePath: ' + absolutePath)

      // absolutePath = '/rebellion-workspace/dell-tech-cloud-site/html/'

      var sTitleNode = document.createElement('span')
      sTitleNode.classList.add('title');
      var titleTextNode = document.createTextNode(obj.title);
      aNode.appendChild(sTitleNode)
      aNode.classList.add('rdc-header-menu-item')
      aNode.setAttribute('href', absolutePath + obj.href);
      aNode.setAttribute('title', obj.title);
      if (obj.target) {
        aNode.setAttribute('target', obj.target);
      }
      sTitleNode.appendChild(titleTextNode)

      if (obj.description) {
        var sDescNode = document.createElement('span')
        sDescNode.classList.add('desc');
        var descTextNode = document.createTextNode(obj.description);
        aNode.appendChild(sDescNode)
        // aNode.classList.add('title-desc')
        sDescNode.appendChild(descTextNode)
      }

      if (obj.classList) {
        // console.log(obj.classList)
        aNode.classList.add(obj.classList)
      }

      if(obj.class) {
        var str = obj.class;
        console.log(str)

        if (str.indexOf('mobile-only') > -1) {
          console.log('found mobile-only')
          console.log(obj)
          // console.log(obj.classList)
          // aNode.classList.add(obj.classList)
        }
      }

      if(obj.classList === 'second-tier' || obj.classList === 'first-tier'){
        var arrowEl = document.createElement('div')
        arrowEl.classList.add('icon-arrow');
        sTitleNode.appendChild(arrowEl)
      }

      if (obj.class) {
        // console.log(aNode.parentElement)
        var classArray = obj.class.split(' ')
        for (var i = 0; i < classArray.length; i++) {
          aNode.classList.add(classArray[i])
        }
      }

      if (obj.dellMetrics) {
        // console.log(obj.dellMetrics)
        aNode.classList.add('dellmetrics-dataclick')
        aNode.setAttribute('data-metrics', obj.dellMetrics);
      }
      // console.log(aNode)
      return aNode
    },

    fixPath: function () {
      var that = this
      for (var i = 0; i < this.localPathsArray.length; i++) {
        var localPathObj = this.localPathsArray[i]
        var localDomain = localPathObj.localDomain
        var localPath = localPathObj.localDirectory
        console.log(localDomain, localPath)
        if (window.location.href.indexOf(localDomain) > -1) {
          jQuery('.rdc-header-subnav a').each(function () {
            // console.log(this)
            jQuery(this).attr('href', jQuery(this).attr('href').replace(that.AEMPath, localPath));
          });
          return 'http://io.local/rebellion-workspace/dell-tech-cloud-site/html/'
        }
      }

      return
    },

    bindEvents: function () {
      console.log('bindEvents')
      var that = this;
      this.submenu = $('.rdc-header-subnav')
      this.submenuItems = this.submenu.find('> ul > li')
      // console.log('this.submenu: ', this.submenu)
      var ciArray = null;
      var current = null;
      var myClickedItem = null;
      var that = this
      // var activeClick = null;

      this.submenu.find('.rdc-header-right .has-dropdown > a').on('click', function (e) {
        e.preventDefault()
        console.log('.has-dropdown > a')

        ciArray = that.submenu.find('.has-dropdown');
        // console.log(ciArray)
        myClickedItem = $(this)[0];

        // find current item clicked in ciArray and remove element
        for (var i = 0; i < ciArray.length; i++) {
          current = $(ciArray[i]).find('> a')[0]

          if(current === myClickedItem) {
            console.log('found one', i)
            that.activeClick = ciArray.splice(i, 1)
          }
        }

        ciArray.removeClass('dd-open')
        $(this).parent().toggleClass('dd-open')

        DTCLOUD.submenu.setDropDownPosition($(this).parent().find('.rdc-header-menu-dropdown')[0])
      })

      this.submenu.find('.rdc-header-left .has-dropdown > a').on('click', function (e) {
        e.preventDefault()
        // console.log('.has-dropdown > a')

        // console.log('window.innerWidth', window.innerWidth)

        if (window.innerWidth >= 980) {
          ciArray = that.submenu.find('.has-dropdown');
          myClickedItem = $(this)[0];

          // find current item clicked in ciArray and remove element
          for (var i = 0; i < ciArray.length; i++) {
            current = $(ciArray[i]).find('> a')[0]

            if(current === myClickedItem) {
              // console.log('found one', i)
              that.activeClick = ciArray.splice(i, 1)
            }
          }

          ciArray.removeClass('dd-open')
          $(this).parent().toggleClass('dd-open')

          if($(this).parent().hasClass('dd-open')){
            // console.log('add expanded')
            $(this).attr('aria-expanded', 'true')
          } else {
            // console.log('remove expanded')
            $(this).attr('aria-expanded', 'false')
          }
          // 

          DTCLOUD.submenu.setDropDownPosition($(this).parent().find('.rdc-header-menu-dropdown')[0])
        }
      })

      // bind dropdown title button to click to close function
      this.submenu.find('.drop-down-title-button').on('click', function (e) {
        e.preventDefault()
        $(this).parent().parent().toggleClass('dd-open')
      })

      // bind dropdown title button to click to close function
      $('.rdc-header-page-title').on('click', function (e) {
        // console.log('title clicked');
        // console.log('this ', this)
        if (window.innerWidth < 980) {
          e.preventDefault();
          $(this).toggleClass('title-expanded');
          $(this).parent().parent().find('.rdc-header-right').toggleClass('expanded');
          $(this).parent().parent().parent().parent().toggleClass('subnav-expanded');
        }
      })

      $(document).on('click', function (event) {
        if(!$(event.target).closest('.rdc-header-subnav').length){
          $('.dropdown-menu').slideUp('fast');
          // console.log($(event.target).closest('.rdc-header-subnav'))
          // console.log('close this')
          // console.log(that.activeClick)
          $(that.activeClick).removeClass('dd-open')
        }
      });
    },

    setDropDownPosition: function (dd) {
      dd.style.cssText = ''

      var dropdownRec = dd.getBoundingClientRect(),
        windowWidth = window.innerWidth

      var offsetRight = windowWidth - dropdownRec.right
      // console.log(offsetRight)

      if (windowWidth >= 980 && offsetRight < 0) {
        dd.style.left = offsetRight - 10 + 'px'
      }
    }
  }
}(window.DTCLOUD = window.DTCLOUD || {}));


jQuery(document).ready(
  function (){
    window.DTCLOUD.submenu.init()
  }
); // Ready event
