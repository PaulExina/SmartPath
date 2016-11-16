package UnzipUtility;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
 
/**
 * This utility extracts files and directories of a standard zip file to
 * a destination directory.
 * @author www.codejava.net
 *
 */
public class UnzipUtility {
    /**
     * Size of the buffer to read/write data
     */
    /**
     * Extracts a zip file specified by the zipFilePath to a directory specified by
     * destDirectory (will be created if does not exists)
     * @param zipFilePath
     * @param destDirectory
     * @throws IOException
     */
    public InputStream unzip(InputStream in) throws IOException {
        InputStream is = null;
        ZipInputStream zipIn = new ZipInputStream(in);
        ZipEntry entry = zipIn.getNextEntry();
        // iterates over entries in the zip file
        while (entry != null) {
           // String filePath = destDirectory + File.separator + entry.getName();
            if (!entry.isDirectory()) {
                // if the entry is a file, extracts it
                is = extractFile(zipIn);
            }
            zipIn.closeEntry();
            entry = zipIn.getNextEntry();
        }
        zipIn.close();
        return is;
    }
    
    /**
     * Extracts a zip entry (file entry)
     * @param zipIn
     * @param filePath
     * @throws IOException
     * 
     * 
     */
   
    private InputStream extractFile(ZipInputStream zipIn) throws IOException {
        //BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(filePath));
    	InputStream is;
    	final int BUFFER = 2048;
        int count = 0;
        byte data[] = new byte[BUFFER];
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        while ((count = zipIn.read(data, 0, BUFFER)) > 0) {
        	byte[] tmp = new byte[count];
        	for(int i = 0; i < count ; i++){
        		tmp[i] = data[i];
        	}
            byte dataUtf8[] = new String(tmp, "ISO-8859-15").getBytes("UTF-8");
        	out.write(dataUtf8);
        }
        is = new ByteArrayInputStream(out.toByteArray());
        return is;
    }
    
    
}