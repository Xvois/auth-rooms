import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getInitials(name: string) {
    // Split the name into words
    const words = name.split(' ');

    // Initialize an empty string for the initials
    let initials = '';

    // Loop through the words and add the first letter (in uppercase) to the initials
    for (const word of words) {
        if (word.length > 0) {
            initials += word[0].toUpperCase();
        }
    }

    return initials;
}