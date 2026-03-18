# To learn more about how to use Nix to configure your environment
# see: https://firebase.google.com/docs/studio/customize-workspace
{pkgs}: {
  # Which nixpkgs channel to use.
  channel = "stable-24.11"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_22
    pkgs.zulu
  ];
  # Sets environment variables in the workspace
  env = {
     NEXT_PUBLIC_FIREBASE_API_KEY = "AIzaSyB2falGVzU0-Xl6a8zetZzgMZD-Es_slAk";
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = "kmh-cv-maker.firebaseapp.com";
     NEXT_PUBLIC_FIREBASE_PROJECT_ID = "kmh-cv-maker";
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = "kmh-cv-maker.firebasestorage.app";
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "755649518526";
     NEXT_PUBLIC_FIREBASE_APP_ID = "1:755649518526:web:e1e648a612472df67cb7ef";
   };
  # This adds a file watcher to startup the firebase emulators. The emulators will only start if
  # a firebase.json file is written into the user's directory
  services.firebase.emulators = {
    # Disabling because we are using prod backends right now
    detect = false;
    projectId = "demo-app";
    services = ["auth" "firestore"];
  };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
    ];
    workspace = {
      onCreate = {
        default.openFiles = [
          "src/app/page.tsx"
        ];
      };
    };
    # Enable previews and customize configuration
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev" "--" "--port" "$PORT" "--hostname" "0.0.0.0"];
          manager = "web";
        };
      };
    };
  };
}
