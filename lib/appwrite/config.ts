import {
  Account,
  Avatars,
  Client,
  Databases,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  url: process.env.EXPO_PUBLIC_API_URL!,
  projectId: process.env.EXPO_PUBLIC_API_PROJECTID!,
  databaseId: process.env.EXPO_PUBLIC_API_DATABASEID!,
  storageId: process.env.EXPO_PUBLIC_API_STORAGEID!,
  userCollectionId: process.env.EXPO_PUBLIC_API_USERCOLLECTIONID!,
  postCollectionId: process.env.EXPO_PUBLIC_API_POSTCOLLECTIONID!,
  savesCollectionId: process.env.EXPO_PUBLIC_API_SAVESCOLLECTIONID!,
  platform: process.env.EXPO_PUBLIC_API_PLATFORM!,
};

export const client = new Client();
client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);
client.setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
